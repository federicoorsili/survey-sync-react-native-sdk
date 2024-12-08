import { View } from 'react-native';
import type { SurveyResponseQuestion, OptionResponse } from '../../types/types';
import QuestionResponse from '../QuestionController.tsx/QuestionController';

interface SurveySingleQuestionProps {
  surveyId: string;
  respondentId: string;
  question: SurveyResponseQuestion;
  handleChange: (
    questionId: number,
    reply: string,
    optionId: number | null,
    isChecked: boolean
  ) => void;
  handleLikertScaleChange: (
    questionId: number,
    reply: string,
    optionId: number
  ) => void;
  responseForCurrentQuestion: OptionResponse | OptionResponse[];
  currentQuestionIndex: number;
}

const SingleQuestionView = ({
  question,
  handleChange,
  responseForCurrentQuestion,
  handleLikertScaleChange,
  currentQuestionIndex,
  surveyId,
  respondentId,
}: SurveySingleQuestionProps) => {
  return (
    <View>
      <QuestionResponse
        surveyId={surveyId}
        respondentId={respondentId}
        handleLikertScaleChange={handleLikertScaleChange}
        question={question}
        currentIndex={currentQuestionIndex}
        response={responseForCurrentQuestion}
        handleChange={handleChange}
      />
    </View>
  );
};

export default SingleQuestionView;
