export enum PathName {
  DASHBOARD = '/dashboard',
}

export enum QuestionTypes {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  LIKERT_SCALE = 'LIKERT_SCALE',
  OPEN_ENDED = 'OPEN_ENDED',
  SHORT_TEXT = 'SHORT_TEXT',
  CONSENT = 'CONSENT',
  YES_NO = 'YES_NO',
  RATING = 'RATING',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  DATE = 'DATE',
  TIME = 'TIME',
  DATETIME = 'DATETIME',
  FILE_UPLOAD = 'FILE_UPLOAD',
}

export enum SurveyStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
  PAUSED = 'PAUSED',
}

export enum ReportTab {
  OVERVIEW = 'overview',
  DETAILS = 'details',
  RESPONDENT_RESPONSES = 'responses',
  AI_INSIGHTS = 'ai-insights',
}

export enum IconType {
  RESUME = 'Resume',
  PAUSE = 'Pause',
  CLOSE = 'Close',
  REPORT = 'Report',
  STAR = 'Star',
  EDIT = 'Edit',
  PUBLISH = 'Publish',
  DRAFT = 'Draft',
  SAVE = 'Save',
  DISTRIBUTE = 'Distribute',
}

// Modals

export enum Sentiment {
  POSITIVE = 'POSITIVE',
  NEUTRAL = 'NEUTRAL',
  NEGATIVE = 'NEGATIVE',
}

export enum ModalTitle {
  DELETE_SURVEY = 'Are you sure you would like to delete this survey?',
  CLOSE = 'Are you sure you would like to close this survey?',
  PUBLISH = 'Are you sure you would like to publish this survey?',
  DELETE_RESPONSE = 'Are you sure you would like to delete selected responses?',
  CONFIRM = 'Are you sure you would like to send survey links to selected customer databases?',
  DELETE_ACCOUNT = 'Are you sure you would like to delete your account and all associated data?',
}

export enum ModalInfo {
  DELETE_SURVEY = 'This action is irreversible. All data associated with this survey including, responses, reports, and more, will be permanently deleted!',
  CLOSE = 'You will not be able to publish or change anything anymore. This surveys will be visible only for statistical purposes.',
  PUBLISH = 'You will no be able to change or update this survey anymore',
  DELETE_RESPONSE = 'You will not be able to access this data anymore',
  CONFIRM = 'This action cannot be undone',
  DELETE_ACCOUNT = 'This action is irreversible. All data associated with your account, including surveys, responses, customers, reports, and more, will be permanently deleted! We may retain some data for legal purposes up to 90 days after deletion.',
}

export enum ModalBtn {
  CLOSE = 'Close Survey',
  PUBLISH = 'Publish Survey',
  DELETE_RESPONSE = 'Delete Responses',
  CONFIRM = 'Confirm',
  DELETE_SURVEY = 'Delete Survey',
}

export enum ModalBtnBorder {
  CLOSE = 'border-rose-500',
  PUBLISH = 'border-green-500',
}

export enum DNDType {
  DROP = 'DROP',
  SIDER = 'SIDER',
  OPTION = 'OPTION',
  FINAL_PAGE = 'FINAL',
}

export enum Max {
  QUESTIONS = 100,
  OPTIONS = 20,
  AI_GENERATED_QUESTIONS = 10,
}

export enum QuotaType {
  GENERATE_SURVEY = 'GENERATE_SURVEY',
  REPLY = 'REPLY',
  CREATE_USER = 'CREATE_USER',
  ANALYZE_REPLY_SENTIMENT = 'ANALYZE_REPLY_SENTIMENT',
  GENERATE_AI_REPORT = 'GENERATE_AI_REPORT',
  SUGGEST_SURVEY_PURPOSES = 'SUGGEST_SURVEY_PURPOSES',
  FINISHED_BY_RESPONDENT_EMAIL_NOTIFICATION = 'FINISHED_BY_RESPONDENT_EMAIL_NOTIFICATION',
  SURVEY_INVITATION_EMAIL_NOTIFICATION = 'SURVEY_INVITATION_EMAIL_NOTIFICATION',
  STORAGE = 'STORAGE',
}

export enum ErrorCode {
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  MALFORMED_REQUEST_ERROR = 'MALFORMED_REQUEST_ERROR',
  LIMIT_REACHED = 'LIMIT_REACHED',
  ACCESS_DENIED_ERROR = 'ACCESS_DENIED_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
}

export enum SettingsTab {
  PROFILE = 'profile',
  TEAM = 'team',
  ACCOUNT = 'account',
}

export enum AuthError {
  CredentialsSignin = 'CredentialsSignin',
  Configuration = 'Configuration',
  AccessDenied = 'AccessDenied',
  Default = 'Default',
}

export const errorMessages = {
  [AuthError.CredentialsSignin]:
    'User with the provided email or password does not exist',
  [AuthError.Configuration]:
    'There was a problem with the server configuration.',
  [AuthError.AccessDenied]: 'Access denied.',
  [AuthError.Default]: 'An unexpected error occurred.',
};

export enum SignUpError {
  EmailInUse = 'EmailInUse',
  WeakPassword = 'WeakPassword',
  InvalidEmail = 'InvalidEmail',
  Default = 'Default',
}

export const signUpErrorMessages = {
  [SignUpError.EmailInUse]:
    'This email is already in use. Please use a different email.',
  [SignUpError.WeakPassword]:
    'The password provided is too weak. Please use a stronger password.',
  [SignUpError.InvalidEmail]:
    'The email provided is invalid. Please check your email format.',
  [SignUpError.Default]:
    'An unexpected error occurred during sign-up. Please try again.',
};

export enum AskQuestionType {
  CONTACT_FORM = 'CONTACT_FORM',
  SUBSCRIPTION = 'SUBSCRIPTION',
  ABUSE_REPORT = 'ABUSE_REPORT',
}

export enum ButtonSize {
  SMALL = 'small',
  BIG = 'big',
}

export enum InvalidDateFormat {
  INVALID = 'Ivalid date format',
}

export enum FinalPageOption {
  PROMOCODE = 'promocode',
  MESSAGE = 'message',
  REDIRECT = 'redirect',
}

export enum ElementName {
  HEADER_TEXT = 'Header Text',
  DESC_TEXT = 'Description Text',
  COPY_LINK = 'Copy Link',
  REDIRECT_BTN = 'Redirect Button',
  UNIQUE_PROMO = 'Unique Promo Code',
}

export enum FinalPagePropertyName {
  HEADER = 'header',
  DESC = 'description',
  LINK = 'link',
  REDIRECT = 'redirectBtn',
  PROMO = 'promo',
}

export enum SubscriptionPlan {
  FREE = 'FREE',
  BASIC = 'BASIC',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export enum QuotaStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
}

export enum ContentItemEnum {
  PAR = 'paragraph',
  SUB = 'subsection',
  LIST_ITEM = 'listItem',
  PIC = 'pic',
  VID = 'vid',
  BTN = 'btn',
}

export enum ContentSectionEnum {
  MAIN = 'mainSection',
  SECTION = 'section',
  LIST = 'list',
  PICTURE = 'picture',
  VIDEO = 'video',
  BUTTON = 'button',
  MARKDOWN = 'markdown',
}

export enum SurveyConnectionType {
  EQUALS_ANY = 'EQUALS_ANY',
  EQUALS_EVERY = 'EQUALS_EVERY',
  CONTAINS = 'CONTAINS',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
  LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  STARTS_WITH = 'STARTS_WITH',
  ENDS_WITH = 'ENDS_WITH',
}

export enum SurveyType {
  STANDARD = 'STANDARD',
  CONDITIONAL = 'CONDITIONAL',
}
