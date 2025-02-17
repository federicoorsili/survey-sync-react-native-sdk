/* eslint-disable react-native/no-inline-styles */
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import { useAppTheme } from '../../context/ThemeContext';

import FinalPage from '../FinalPage/FinalPage';
import Navigation from '../Navigation/Navigation';
import QuestionCounter from '../QuestionCounter/QuestionCounter';
import { createStyles } from './survey.styles';
import QuestionController from '../QuestionController.tsx/QuestionController';
import { submitLogicalReply } from '../../api/directAPI';
import type {
  AccountSettingsResponse,
  QuestionDto,
  ResponseByQuestion,
  OptionResponse,
  SurveyDto,
} from '../../types/types';
import { compareResponses } from '../../utils/utils';

interface SurveyComponentProps {
  survey: SurveyDto;
  alias: string;
  loading: boolean;
  respondentId: string;
  onFinishedSurvey?: (respondentId: string) => void;
  userLogoData: AccountSettingsResponse;
}

const SurveyConditionalView = ({
  userLogoData,
  respondentId,
  survey,
  onFinishedSurvey,
}: SurveyComponentProps) => {
  const { questions } = survey;
  const { isDark, theme } = useAppTheme();
  const styles = createStyles(isDark);

  const { logoUrl } = userLogoData || {};

  const [questionsHistory, setQuestionsHistory] = useState<QuestionDto[]>([
    questions[0] as QuestionDto,
  ]);

  const [loading, setLoading] = useState<boolean>(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const [responsesByQuestions, setResponsesByQuestions] = useState<
    ResponseByQuestion[]
  >([]);

  const [renderFinalPage, setRenderFinalPage] = useState<boolean>(false);

  // "question" and "response" for the currentQuestionIndex
  const question = questionsHistory[currentQuestionIndex] || null;
  const storedResponse = responsesByQuestions.find(
    (rbq) => rbq.questionRefId === question?.refId
  );

  const [response, setResponse] = useState<OptionResponse[] | null>(
    storedResponse?.response || null
  );

  const isAnswerValid =
    !question?.required ||
    (response && response.length > 0 && response[0]?.reply);

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

  useEffect(() => {
    const q = questionsHistory[currentQuestionIndex];
    if (!q) return;
    const matched = responsesByQuestions.find(
      (rbq) => rbq.questionRefId === q.refId
    );
    setResponse(matched?.response || null);
  }, [currentQuestionIndex, questionsHistory, responsesByQuestions]);

  const updateResponsesByQuestions = (
    qRefId: string,
    resp: OptionResponse[]
  ) => {
    setResponsesByQuestions((prev) => {
      const existingIndex = prev.findIndex(
        (rbq) => rbq.questionRefId === qRefId
      );
      if (existingIndex !== -1) {
        return prev.map((rbq) =>
          rbq.questionRefId === qRefId ? { ...rbq, response: resp } : rbq
        );
      }
      return [...prev, { questionRefId: qRefId, response: resp }];
    });
  };

  const handleSubmitResponse = async (): Promise<string | null> => {
    if (!question) return null; // Safety check
    setLoading(true);
    try {
      const responseToSubmit = response || [];
      const isLastReply = question.order === questions.length - 1;

      const data = await submitLogicalReply(
        survey.id,
        respondentId,
        question.id,
        responseToSubmit,
        isLastReply
      );

      updateResponsesByQuestions(question.refId, responseToSubmit);

      if (data.nextQuestionRefId === null) {
        return null;
      }
      return data.nextQuestionRefId;
    } catch {
      console.warn('Failed to submit response');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const truncateHistoryAt = (index: number) => {
    const updatedQHistory = questionsHistory.slice(0, index + 1);

    const updatedResponses = responsesByQuestions.filter((rbq) =>
      updatedQHistory.some((q) => q.refId === rbq.questionRefId)
    );

    setQuestionsHistory(updatedQHistory);
    setResponsesByQuestions(updatedResponses);
  };

  const handleNavigation = async (direction: number) => {
    if (direction === 1) {
      const prevStoredResponse = storedResponse?.response || null;

      const hasChanged = !compareResponses(response, prevStoredResponse);

      if (hasChanged) {
        truncateHistoryAt(currentQuestionIndex);

        const nextRefId = await handleSubmitResponse();
        if (nextRefId === null) {
          if (onFinishedSurvey) {
            onFinishedSurvey(respondentId);
          }

          setRenderFinalPage(true);
          return;
        }

        const nextQuestion = questions.find((q) => q.refId === nextRefId);
        if (nextQuestion) {
          setQuestionsHistory((prev) => [...prev, nextQuestion]);
          setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        }
      } else {
        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex < questionsHistory.length) {
          setCurrentQuestionIndex(nextIndex);
        } else {
          const nextRefId = await handleSubmitResponse();
          if (nextRefId === null) {
            if (onFinishedSurvey) {
              onFinishedSurvey(respondentId);
            }

            setRenderFinalPage(true);
            return;
          }
          const nextQuestion = questions.find((q) => q.refId === nextRefId);
          if (nextQuestion) {
            setQuestionsHistory((prev) => [...prev, nextQuestion]);
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          }
        }
      }
    } else if (currentQuestionIndex > 0) {
      const prevStoredResponse = storedResponse?.response || null;
      const hasChanged = !compareResponses(response, prevStoredResponse);

      if (hasChanged) {
        truncateHistoryAt(currentQuestionIndex);
        await handleSubmitResponse();
      }

      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (!question) {
    return (
      <View style={styles.center}>
        <Text>No question found for the current index.</Text>
      </View>
    );
  }

  if (renderFinalPage) {
    return (
      <FinalPage
        finalPageData={survey?.properties?.finalPage}
        respondentId={respondentId}
        userLogo={logoUrl}
      />
    );
  }

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
        <QuestionCounter currentQuestionIndex={currentQuestionIndex} />
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
          {loading ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color={theme.text.primary} />
            </View>
          ) : (
            <>
              <View style={styles.questionWrapper}>
                <Text style={styles.questionText}>{question.question}</Text>
              </View>
              <View style={styles.questionAnswerWrapper}>
                <View>
                  <QuestionController
                    question={question}
                    surveyId={survey.id}
                    respondentId={respondentId}
                    handleChange={setResponse}
                    currentQuestionIndex={currentQuestionIndex}
                    response={response}
                  />
                </View>
              </View>
            </>
          )}
        </Animated.View>

        <Navigation
          currentQuestionIndex={currentQuestionIndex}
          answerRequired={!isAnswerValid}
          handleNavigation={handleNavigation}
          lastIndex={survey.questions.length - 1}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SurveyConditionalView;
