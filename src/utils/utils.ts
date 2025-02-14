import {
  SurveyStatus,
  QuestionTypes,
  IconType,
  QuotaType,
  ErrorCode,
} from '../types/enums';
import type { OptionResponse, ReportResponsesReplies } from '../types/types';

type Option = {
  option: string;
  order: number;
};

export const isEmptyValue = (value: any): boolean => {
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return value === '' || value == null || value.reply === '';
};

export const getStatusColor = (status: SurveyStatus) => {
  switch (status) {
    case SurveyStatus.PUBLISHED:
      return 'border-green-500 bg-green-300';
    case SurveyStatus.DRAFT:
      return 'border-gray-400 bg-gray-300';
    case SurveyStatus.CLOSED:
      return 'border-rose-500 bg-rose-200';
    case SurveyStatus.PAUSED:
      return 'border-yellow-500';
    default:
      return 'gray-500';
  }
};

export const createNumericOptions = (count: number): Option[] => {
  const options: Option[] = [];

  for (let i = 1; i <= count; i++) {
    options.push({
      option: i.toString(), // Convert the number to a string
      order: i - 1, // Set order starting from 0
    });
  }

  return options;
};

export const formatQuestionType = (str: QuestionTypes) => {
  // Handle specific cases separately
  if (str === QuestionTypes.DATETIME) {
    return 'Date & Time';
  }
  if (str === QuestionTypes.YES_NO) {
    return 'Yes / No';
  }

  // Default case for all other types
  return str
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const getIconColor = (status: SurveyStatus) => {
  switch (status) {
    case SurveyStatus.PUBLISHED:
      return 'green';
    case SurveyStatus.DRAFT:
      return 'currentColor';
    case SurveyStatus.CLOSED:
      return 'rose';
    case SurveyStatus.PAUSED:
      return 'yellow';
    default:
      return 'gray';
  }
};

export const getBorderColor = (status: IconType) => {
  switch (status) {
    case IconType.PUBLISH:
      return 'border-green-500';
    case IconType.DRAFT:
      return 'border-gray-400';
    case IconType.CLOSE:
      return 'border-rose-500';
    case IconType.PAUSE:
      return 'border-yellow-500';
    case IconType.RESUME:
      return 'border-sky-500';
    case IconType.EDIT:
      return 'border-gray-400';
    case IconType.SAVE:
      return 'border-blue-500';
    case IconType.REPORT:
      return 'border-neutral';
    default:
      return 'gray-500';
  }
};

export const isEmpty = (obj: Record<string, any>): boolean => {
  for (let prop in obj) {
    if (Object.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
};

export const calculateAnsweredQuestions = (
  answers: ReportResponsesReplies[],
  totalQuestions: number
) => {
  let answeredCount = 0;

  answers.forEach((answer) => {
    if (answer.replies.length > 0) {
      answeredCount++;
    }
  });

  const allQuestionsAnswered = answeredCount === totalQuestions;
  const questionAnswered = `${answeredCount}/${totalQuestions}`;

  return { allQuestionsAnswered, questionAnswered };
};

export const toHumanReadableTime = (
  timestamp: string | number | Date
): string => {
  const date = new Date(timestamp);

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString('en-US', dateOptions);
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

  return `${formattedDate}, ${formattedTime}`;
};

export const formatQuotaType = (type: QuotaType): string => {
  const prettyNames: { [key in QuotaType]: string } = {
    GENERATE_SURVEY: 'AI Survey Generations',
    REPLY: 'Survey Responses',
    CREATE_USER: 'Member Acounts',
    ANALYZE_REPLY_SENTIMENT: 'Sentiment Analyses',
    GENERATE_AI_REPORT: 'AI Reports',
    SUGGEST_SURVEY_PURPOSES: 'Survey Suggestions',
    FINISHED_BY_RESPONDENT_EMAIL_NOTIFICATION: 'Email Notifications',
    SURVEY_INVITATION_EMAIL_NOTIFICATION: 'Survey Invitations',
    STORAGE: 'Storage',
  };
  return prettyNames[type] || 'Unknown Quota';
};

// validate email:

export const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;
  return passwordRegex.test(password);
};
// validate password match:

export const checkPasswordsMatch = (
  password: string,
  confirmPassword: string
) => {
  if (password !== confirmPassword) {
    return false;
  }

  return true;
};

export const generateFourDigitRandomNumber = () => {
  return Math.floor(Math.random() * 9000) + 1000;
};

export const formatDisplayValue = (text: string) => {
  if (text.length > 20) {
    return `${text.substring(0, 20)}..`;
  }
  return text;
};

export const convertDDMMYYYYtoMMDDYYYY = (dateString: string) => {
  const parts = dateString.split('/'); // Split the date into parts
  if (parts.length !== 3) {
    throw new Error('Invalid date format. Please use DD/MM/YYYY.');
  }
  const [day, month, year] = parts;
  return `${month}/${day}/${year}`; // Reassemble in MM/DD/YYYY format
};

export const formatStringTime = (stringData: string) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}/;
  const isValidFormat = dateRegex.test(stringData);
  const parts = stringData.trim().split(' ');
  if (!isValidFormat) {
    return parts[0] ? parts[0] : '';
  }
  return parts.length > 1 ? parts[1] : parts[0];
};

export const getLocalDateInFutureISO = (days: number): string => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);

  // Adjust for local timezone offset
  const timezoneOffsetInMilliseconds = currentDate.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  const localDate = new Date(
    currentDate.getTime() - timezoneOffsetInMilliseconds
  );

  return localDate.toISOString();
};

export function getFriendlyErrorMessage(
  code: ErrorCode,
  msg: string = ''
): string {
  switch (code) {
    case ErrorCode.UNEXPECTED_ERROR:
      return 'Unexpected internal error occurred. Please try again later.';
    case ErrorCode.AUTH_ERROR:
      return 'Authentication failed. Please sign in again';
    case ErrorCode.MALFORMED_REQUEST_ERROR:
      return msg
        ? msg
        : 'The request was malformed. Please check your data and try again.';
    case ErrorCode.LIMIT_REACHED:
      return msg
        ? msg
        : 'You have reached your limit for this action. Upgrade your plan to get more.';
    case ErrorCode.ACCESS_DENIED_ERROR:
      return msg
        ? msg
        : 'You do not have permission to access this resource. Please contact support@survey-sync.com if you think this is a mistake.';
    case ErrorCode.NOT_FOUND_ERROR:
      return 'The requested entity was not found. Please check the URL or identifier provided and try again.';
    default:
      return 'An unknown error occurred. Please contact support@survey-sync.com.';
  }
}

export function formatDuration(seconds: number | null): string {
  if (seconds === null) {
    return 'Invalid input'; // Handle the null case
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours} h, ${minutes} min`; // Format for hours and minutes
  } else if (minutes > 0) {
    return `${minutes} min, ${Math.round(remainingSeconds)} sec`; // Format for minutes and seconds
  } else {
    return `${remainingSeconds} sec`; // Format for seconds
  }
}

/**
 * Converts a Date object or an ISO date string to MM/DD/YYYY format.
 * @param date - A Date object or a string in ISO format.
 * @returns A string in MM/DD/YYYY format.
 */
export const formatToDDMMYYYY = (date: Date | string): string => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';

  const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(d.getDate()).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatTimeToHHMMSS = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export const compareResponses = (
  responseA: OptionResponse[] | null,
  responseB: OptionResponse[] | null
): boolean => {
  // If both are null, consider them equal
  if (!responseA && !responseB) return true;

  // If one is null but the other is not, they're different
  if (!responseA || !responseB) return false;

  // Check if they differ in length
  if (responseA.length !== responseB.length) return false;

  // Check each item
  for (let i = 0; i < responseA.length; i++) {
    if (
      responseA[i]?.optionId !== responseB[i]?.optionId ||
      responseA[i]?.reply !== responseB[i]?.reply
    ) {
      return false;
    }
  }

  return true;
};
