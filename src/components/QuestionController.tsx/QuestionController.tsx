import { QuestionTypes } from '../../types/enums';
import type { OptionResponse, QuestionDto } from '../../types/types';
import EmptyListPlaceholder from '../Placeholder/EmptyListPlaceholder';
import Consent from '../QuestionView/Consent/Consent';
// import DateComponent from '../QuestionView/Date/DateComponent';
// import DateTime from '../QuestionView/DateTime/DateTime';
import Email from '../QuestionView/Email/Email';
// import FileUpload from '../QuestionView/FileUpload/FileUpload';
import LikertScale from '../QuestionView/LikertScale/LikertScale';
import OpenEnded from '../QuestionView/OpenEnded/OpenEnded';
import Phone from '../QuestionView/Phone/Phone';
import Ratings from '../QuestionView/Ratings/Ratings';
import ShortText from '../QuestionView/ShortText/ShortText';
import MultipleChoice from '../QuestionView/SingleMultipleChoices/MultipleChoice';
import SingleChoice from '../QuestionView/SingleMultipleChoices/SingleChoice';
// import TimeComponent from '../QuestionView/Time/TimeComponent';
import YesNo from '../QuestionView/YesNo/YesNo';

interface Props {
  surveyId: string;
  respondentId: string;
  question: QuestionDto;
  handleChange: (response: OptionResponse[]) => void;
  response: OptionResponse[] | null;
  currentQuestionIndex: number;
}

const QuestionController = ({ question, response, handleChange }: Props) => {
  if (!question) {
    return <EmptyListPlaceholder text="No question provided" />;
  }

  switch (question.type) {
    case QuestionTypes.SINGLE_CHOICE:
      return (
        <SingleChoice
          question={question}
          response={response}
          handleChange={handleChange}
        />
      );

    case QuestionTypes.MULTIPLE_CHOICE:
      return (
        <MultipleChoice
          question={question}
          response={response}
          handleChange={handleChange}
        />
      );

    case QuestionTypes.OPEN_ENDED:
      return <OpenEnded response={response} handleChange={handleChange} />;

    case QuestionTypes.SHORT_TEXT:
      return <ShortText response={response} handleChange={handleChange} />;

    case QuestionTypes.LIKERT_SCALE:
      return (
        <LikertScale
          question={question}
          response={response}
          handleChange={handleChange}
        />
      );

    case QuestionTypes.RATING:
      return (
        <Ratings
          question={question}
          response={response}
          handleChange={handleChange}
        />
      );

    case QuestionTypes.YES_NO:
      return (
        <YesNo
          question={question}
          response={response}
          handleChange={handleChange}
        />
      );

    case QuestionTypes.CONSENT:
      return (
        <Consent
          question={question}
          response={response}
          handleChange={handleChange}
        />
      );

    case QuestionTypes.EMAIL:
      return (
        <Email
          question={question}
          response={response}
          handleChange={handleChange}
        />
      );

    case QuestionTypes.PHONE:
      return <Phone response={response} handleChange={handleChange} />;

    // case QuestionTypes.DATE:
    //   return (
    //     <DateComponent
    //       question={question}
    //       response={response}
    //       handleChange={handleChange}
    //     />
    //   );

    // case QuestionTypes.TIME:
    //   return <TimeComponent response={response} handleChange={handleChange} />;

    // case QuestionTypes.DATETIME:
    //   return (
    //     <DateTime
    //       question={question}
    //       response={response}
    //       handleChange={handleChange}
    //     />
    //   );

    // case QuestionTypes.FILE_UPLOAD:
    //   return (
    //     <FileUpload
    //       question={question}
    //       response={response}
    //       handleChange={handleChange}
    //       surveyId={surveyId}
    //       respondentId={respondentId}
    //     />
    //   );

    default:
      return <EmptyListPlaceholder text="No question provided" />;
  }
};

export default QuestionController;
