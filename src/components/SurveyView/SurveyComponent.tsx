/* eslint-disable react-native/no-inline-styles */
import { useCallback, useEffect, useRef, useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  fetchSurveyDataByAlias,
  fetchAccountSettings,
  startSurvey,
  submitReply,
} from '../../api/directAPI';
import { useAppTheme } from '../../context/ThemeContext';
import { QuestionTypes } from '../../types/enums';
import type {
  SurveyResponseData,
  Responses,
  SurveyResponseQuestion,
  OptionResponse,
} from '../../types/types';
import { isEmptyValue } from '../../utils/utils';
import FinalPage from '../FinalPage/FinalPage';
import Navigation from '../Navigation/Navigation';
import QuestionCounter from '../QuestionCounter/QuestionCounter';
import { createStyles } from './survey.styles';
import SingleQuestionView from '../SingleQuestionView/SingleQuestionView';

interface SurveyComponentProps {
  alias: string;
  onFinishedSurvey?: (respondentId: string) => void;
}

const SurveyComponent = ({ alias, onFinishedSurvey }: SurveyComponentProps) => {
  const [surveyData, setSurveyData] = useState<SurveyResponseData | null>(null);
  const [respondentId, setRespondentId] = useState('');
  const [responses, setResponses] = useState<Responses>({});
  const [submittedResponses, setSubmittedResponses] = useState<Responses>({});
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerRequired, setAnswerRequired] = useState(false);
  const [userLogo, setUserLogo] = useState<string | null>(null);
  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  useEffect(() => {
    // Reset scale to smaller
    scaleAnim.setValue(0.9);

    // Animate to full size
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 7,
      tension: 20,
      useNativeDriver: true,
    }).start();
  }, [currentQuestionIndex, scaleAnim]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (!alias || typeof alias !== 'string')
        throw new Error('Alias is not defined');
      const data = await fetchSurveyDataByAlias(alias);
      const userLogoData = await fetchAccountSettings(alias);
      if (userLogoData?.logoUrl) {
        setUserLogo(userLogoData.logoUrl);
      }

      const initialResponses: Responses = data.questions.reduce(
        (
          acc: SurveyResponseQuestion,
          question: SurveyResponseQuestion
        ): SurveyResponseQuestion => ({
          ...acc,
          [question.id]:
            question.type === QuestionTypes.MULTIPLE_CHOICE ? [] : '',
        }),
        {}
      );

      setSurveyData(data);
      setResponses(initialResponses);

      const respId = await startSurvey(data.id);
      setRespondentId(respId.id);
    } catch (error) {
      console.error('Failed to load survey data:', error);
      setSurveyData(null);
      // const errorMessage = getFriendlyErrorMessage(error.code, error.message);
      // DefaultErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [alias]);

  useEffect(() => {
    if (alias) loadData();
  }, [alias, loadData]);

  useEffect(() => {
    if (!surveyData || currentQuestionIndex === -1) return;

    const question = surveyData.questions[currentQuestionIndex];
    const questionId = question?.id;
    const responseForCurrentQuestion =
      responses && questionId && responses[questionId];

    // Check for emptiness based on the new response structure
    if (question?.required) {
      let isResponseEmpty;
      if (Array.isArray(responseForCurrentQuestion)) {
        // Check if array is empty or all entries in array are empty replies
        isResponseEmpty =
          responseForCurrentQuestion.length === 0 ||
          responseForCurrentQuestion.every((resp) => !resp.reply.trim());
      } else if (responseForCurrentQuestion) {
        // Check if single response is empty
        isResponseEmpty = !responseForCurrentQuestion.reply.trim();
      } else {
        // No response at all
        isResponseEmpty = true;
      }
      setAnswerRequired(isResponseEmpty);
    } else {
      setAnswerRequired(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, responses]);

  const handleSubmit = async (
    id: number,
    response: OptionResponse | OptionResponse[]
  ) => {
    try {
      if (!surveyData) throw new Error('Survey data is null');

      const questionId = id;
      const question = surveyData.questions.find((q) => q.id === questionId);
      if (!question)
        throw new Error(`Question with id ${questionId} not found`);

      const isLastReply =
        currentQuestionIndex === surveyData.questions.length - 1;
      if (!alias) throw new Error('Alias is undefined');
      if (!respondentId) throw new Error('Survey is undefined');

      const responseToSend = Array.isArray(response) ? response : [response];

      await submitReply(
        surveyData.id,
        respondentId,
        questionId,
        responseToSend,
        isLastReply
      );
    } catch (error) {
      console.error('Failed to submit survey:', error);
      throw new Error('Failed to submit survey');
    }
  };

  const handleChange = useCallback(
    (
      questionId: number,
      reply: string,
      optionId: number | null,
      isChecked: boolean
    ) => {
      setResponses((prev) => {
        const currentResponse = prev[questionId];

        // For multiple choice questions (when currentResponse is an array)
        if (Array.isArray(currentResponse)) {
          // If checked, add the new option
          // If unchecked, remove the option
          return {
            ...prev,
            [questionId]: isChecked
              ? [...currentResponse, { optionId, reply }]
              : currentResponse.filter((item) => item.optionId !== optionId),
          };
        }

        // For single choice questions, simply set the new value
        return {
          ...prev,
          [questionId]: { optionId, reply },
        };
      });
    },
    []
  );

  const handleLikertScaleChange = useCallback(
    (questionId: number, reply: string, optionId: number) => {
      setResponses((prev) => ({
        ...prev,
        [questionId]: { optionId, reply },
      }));
    },
    []
  );

  const handleQuestionSubmittion = async (
    newResponses: Responses
  ): Promise<void> => {
    const submitted = submittedResponses;
    setSubmittedResponses((prevResponses) => {
      const updatedResponses: Responses = { ...prevResponses };
      let isUpdated = false;

      for (const keyStr of Object.keys(newResponses)) {
        const key = parseInt(keyStr, 10);
        const newValue = newResponses[key];

        if (!isEmptyValue(newValue)) {
          if (!prevResponses[key]) {
            if (newValue !== undefined) {
              updatedResponses[key] = newValue;
            }
            isUpdated = true;
          } else if (
            JSON.stringify(prevResponses[key]) !== JSON.stringify(newValue) &&
            newValue !== undefined
          ) {
            updatedResponses[key] = newValue;
            isUpdated = true;
          }
        }
      }

      return isUpdated ? updatedResponses : prevResponses;
    });

    // Handling asynchronous submissions separately
    for (const keyStr of Object.keys(newResponses)) {
      const key = parseInt(keyStr, 10);
      const newValue = newResponses[key];
      if (!isEmptyValue(newValue) && !submittedResponses[key]) {
        if (newValue !== undefined) {
          await handleSubmit(key, newValue);
        }
      } else if (
        !isEmptyValue(newValue) &&
        JSON.stringify(submitted[key]) !== JSON.stringify(newValue)
      ) {
        if (newValue !== undefined) {
          await handleSubmit(key, newValue);
        }
      }
    }
  };

  const handleLastQuestionSubmittion = async (
    questionId: number,
    value: OptionResponse | OptionResponse[]
  ) => {
    setLoading(true);
    await handleSubmit(questionId, value);
    if (onFinishedSurvey) {
      await onFinishedSurvey(respondentId);
    }
    setCurrentQuestionIndex(-1);
    setLoading(false);
  };

  const handleNavigation = (direction: number) => {
    if (answerRequired && direction > 0) return;
    const nextIndex = currentQuestionIndex + direction;
    if (surveyData) {
      const question = surveyData.questions[currentQuestionIndex];
      const questionId = question?.id;
      const responseForCurrentQuestion =
        responses && questionId && responses[questionId];

      if (nextIndex >= surveyData.questions.length) {
        const finalResponse = responseForCurrentQuestion
          ? responseForCurrentQuestion
          : [];
        if (questionId) {
          handleLastQuestionSubmittion(questionId, finalResponse);
          return;
        }
      }

      if (responseForCurrentQuestion) {
        handleQuestionSubmittion({
          [questionId]: responseForCurrentQuestion,
        });
      }
    }

    setCurrentQuestionIndex((prev) => prev + direction);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.text.primary} />
      </View>
    );
  }

  if (currentQuestionIndex === -1) {
    return (
      <FinalPage
        finalPageData={surveyData?.properties?.finalPage}
        respondentId={respondentId}
        userLogo={userLogo}
      />
    );
  }

  if (!surveyData?.questions || surveyData.questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Failed to load survey data.</Text>
      </View>
    );
  }

  const question = surveyData?.questions?.[currentQuestionIndex];

  if (!question) {
    return (
      <View style={styles.center}>
        <Text>No question found for the current index.</Text>
      </View>
    );
  }

  const questionId = question.id;
  const responseForCurrentQuestion =
    responses[questionId] ??
    (question.type === QuestionTypes.MULTIPLE_CHOICE
      ? []
      : { optionId: null, reply: '' });

  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
          paddingTop: Platform.OS === 'android' ? 50 : 20,
        }}
      >
        <QuestionCounter
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={surveyData.questions.length}
        />
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {question.required && (
            <View style={styles.astericsWrapper}>
              <FontAwesome6
                name="asterisk"
                size={18}
                color={theme.text.primary}
                style={{ marginRight: 5 }}
              />
            </View>
          )}
          <View style={styles.questionWrapper}>
            <Text style={styles.questionText}>{question.question}</Text>
          </View>
          <View style={styles.questionAnswerWrapper}>
            <SingleQuestionView
              question={question}
              surveyId={surveyData.id}
              respondentId={respondentId}
              handleChange={handleChange}
              handleLikertScaleChange={handleLikertScaleChange}
              currentQuestionIndex={currentQuestionIndex}
              responseForCurrentQuestion={responseForCurrentQuestion}
            />
          </View>
        </Animated.View>

        <Navigation
          currentQuestionIndex={currentQuestionIndex}
          handleNavigation={handleNavigation}
          answerRequired={answerRequired}
          lastIndex={surveyData.questions.length - 1}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SurveyComponent;
