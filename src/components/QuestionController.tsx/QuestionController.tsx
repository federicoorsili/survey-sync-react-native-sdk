import { QuestionTypes } from '../../types/enums';
import type { OptionResponse, SurveyResponseQuestion } from '../../types/types';
import EmptyListPlaceholder from '../Placeholder/EmptyListPlaceholder';
import Consent from '../QuestionView/Consent/Consent';
import DateComponent from '../QuestionView/Date/DateComponent';
import DateTime from '../QuestionView/DateTime/DateTime';
import Email from '../QuestionView/Email/Email';
import FileUpload from '../QuestionView/FileUpload/FileUpload';
import LikertScale from '../QuestionView/LikertScale/LikertScale';
import OpenEnded from '../QuestionView/OpenEnded/OpenEnded';
import Phone from '../QuestionView/Phone/Phone';
import Ratings from '../QuestionView/Ratings/Ratings';
import ShortText from '../QuestionView/ShortText/ShortText';
import MultipleChoice from '../QuestionView/SingleMultipleChoices/MultipleChoice';
import SingleChoice from '../QuestionView/SingleMultipleChoices/SingleChoice';
import TimeComponent from '../QuestionView/Time/TimeComponent';
import YesNo from '../QuestionView/YesNo/YesNo';

type BaseQuestionProps = {
  question: SurveyResponseQuestion;
  response: OptionResponse | OptionResponse[];
  handleChange: (
    questionId: number,
    reply: string,
    optionId: number | null,
    isChecked: boolean
  ) => void;
};

type ScaleQuestionProps = BaseQuestionProps & {
  handleLikertScaleChange: (
    questionId: number,
    reply: string,
    optionId: number
  ) => void;
};

type FileUploadProps = BaseQuestionProps & {
  surveyId: string;
  respondentId: string;
};

interface Props {
  surveyId: string;
  respondentId: string;
  question: SurveyResponseQuestion;
  currentIndex: number;
  response: OptionResponse | OptionResponse[];
  handleLikertScaleChange: (
    questionId: number,
    reply: string,
    optionId: number
  ) => void;
  handleChange: (
    questionId: number,
    reply: string,
    optionId: number | null,
    isChecked: boolean
  ) => void;
}

const QuestionResponse = ({
  question,
  response,
  handleChange,
  handleLikertScaleChange,
  surveyId,
  respondentId,
}: Props) => {
  if (!question) {
    return <EmptyListPlaceholder text="No question provided" />;
  }

  const baseProps: BaseQuestionProps = {
    question,
    response,
    handleChange,
  };

  const scaleProps: ScaleQuestionProps = {
    ...baseProps,
    handleLikertScaleChange,
  };

  const fileUploadProps: FileUploadProps = {
    ...baseProps,
    surveyId,
    respondentId,
  };

  switch (question.type) {
    case QuestionTypes.SINGLE_CHOICE:
      return <SingleChoice {...baseProps} />;

    case QuestionTypes.OPEN_ENDED:
      return <OpenEnded {...baseProps} />;

    case QuestionTypes.LIKERT_SCALE:
      return <LikertScale {...scaleProps} />;

    case QuestionTypes.RATING:
      return <Ratings {...scaleProps} />;

    case QuestionTypes.MULTIPLE_CHOICE:
      return <MultipleChoice {...baseProps} />;

    case QuestionTypes.SHORT_TEXT:
      return <ShortText {...baseProps} />;

    case QuestionTypes.YES_NO:
      return <YesNo {...baseProps} />;

    case QuestionTypes.CONSENT:
      return <Consent {...baseProps} />;

    case QuestionTypes.EMAIL:
      return <Email {...baseProps} />;

    case QuestionTypes.PHONE:
      return <Phone {...baseProps} />;

    case QuestionTypes.DATE:
      return <DateComponent {...baseProps} />;

    case QuestionTypes.TIME:
      return <TimeComponent {...baseProps} />;

    case QuestionTypes.DATETIME:
      return <DateTime {...baseProps} />;

    case QuestionTypes.FILE_UPLOAD:
      return <FileUpload {...fileUploadProps} />;

    default:
      return <p>Unsupported question type: {question.type}</p>;
  }
};

export default QuestionResponse;
