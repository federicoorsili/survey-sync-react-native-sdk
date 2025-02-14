export interface SurveyStartedResponse {
  id: string;
}

import type { SurveyResponseData } from '../../lib/typescript/commonjs/src/types/types';
import {
  FinalPagePropertyName,
  QuestionTypes,
  Sentiment,
  SubscriptionPlan,
  SurveyConnectionType,
  SurveyStatus,
  SurveyType,
} from './enums';

export interface CategoryData {
  id: number;
  name: string;
}

export interface OptionData {
  id?: number;
  option: string;
  imageUrl?: string;
  order?: number;
  createdDate?: Date;
  modifiedDate?: Date;
}
export interface QuestionData {
  type: QuestionTypes;
  question: string;
  required: boolean;
  properties: null | QuestionProperties;
  order?: number;
  options: OptionData[];
  id?: number | string;
}

export interface SurveyData {
  id: string;
  status: SurveyStatus;
  name: string;
  description: string;
  questions: QuestionData[];
  properties: null | SurveyProperties;
  categories?: CategoryData[];
  createdDate?: Date;
  modifiedDate?: Date;
}

export interface CreateSurveyDto {
  id?: string;
  name: string;
  description: string;
  questions: QuestionData[];
}

export interface ConnectionProperties {
  [key: string]: number;
}

export interface SaveSurveyConnectionRequest {
  id?: number;
  refId: string;
  sourceQuestionRefId: string;
  targetQuestionRefId?: string;
  type: SurveyConnectionType;
  conditionValues: string[];
  order: number;
  properties: null | ConnectionProperties;
}

export interface QuestionDto {
  id: number;
  refId: string;
  type: QuestionTypes;
  question: string;
  required: boolean;
  order: number;
  options: OptionResponseData[];
  connections?: SaveSurveyConnectionRequest[];
  properties: QuestionProperties | null;
  createdDate: Date;
  modifiedDate: Date;
}

export interface SurveyDto {
  id: string;
  alias: string;
  name: string;
  description: string;
  status: SurveyStatus;
  questions: QuestionDto[];
  categories: CategoryData[];
  properties: null | SurveyProperties;
  type: SurveyType;
  createdDate: Date;
  modifiedDate: Date;
}

// customer response types

export interface OptionResponse {
  optionId: number | null;
  reply: string;
}

export interface Responses {
  [key: number]: OptionResponse | OptionResponse[];
}

export interface OptionResponseData {
  id: number;
  option: string;
  order: number;
  imageUrl: string;
  createdDate: Date;
  modifiedDate: Date;
}
export interface SurveyResponseQuestion {
  id: number;
  type: QuestionTypes;
  question: string;
  required: boolean;
  order: number;
  options: OptionResponseData[];
  properties: QuestionProperties | null;
  createdDate: Date;
  modifiedDate: Date;
}

// AI builder types
export interface IASurveyRequestData {
  countOfQuestions: number;
  purpose: string;
}

// report data:

export interface ReportData {
  questionReports: QuestionReport[];
  survey: Survey;
}

export interface QuestionReport {
  questionId: number;
  data: Data;
}

export interface Data {
  additionalProp1: number;
  additionalProp2: number;
  additionalProp3: number;
}

export interface Sentiments {
  enabled: boolean;
  positive: number;
  negative: number;
  neutral: number;
  total: number;
}

export interface Replies<T> {
  totalElements: number;
  totalPages: number;
  number: number;
  pageable: Pageable;
  sort: Sort;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
  content: T[];
  empty: boolean;
}

export interface Content {
  replyId: string;
  respondentId: string;
  surveyId: string;
  questionId: number;
  optionId: number;
  sentiment: Sentiment;
  reply: string;
  createdDate: Date;
  modifiedDate: Date;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: Sort;
  offset: number;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Survey {
  id: string;
  name: string;
  alies: string;
  description: string;
  status: string;
  questions: Question[];
  categories: Category[];
  createdDate: Date;
  modifiedDate: Date;
}

export interface Category {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  type: QuestionTypes;
  question: string;
  required: boolean;
  properties: null | QuestionProperties;
  order: number;
  createdDate: Date;
  modifiedDate: Date;
  options: Option[];
}

export interface Option {
  id: number;
  option: string;
  order: number;
  createdDate: Date;
  modifiedDate: Date;
}

// customers
export interface Customers {
  id: number;
  name: string;
  email: string;
  customerDatabase: CustomerDatabase;
}

export interface CustomerDatabase {
  id: number;
  name: string;
}

export interface SurveyReply {
  replyId: string;
  respondentId: string;
  surveyId: string;
  questionId: number;
  optionId: number;
  reply: string;
  createdDate: string;
  modifiedDate: string;
}

export interface DeleteRepliesRequest {
  respondentIds: string[];
}

// Report Response Data
export interface ReportResponsesReplies {
  completed: boolean;
  questionType: QuestionTypes;
  sentiment: Sentiment;
  respondentId: string;
  questionId: number;
  question: string;
  replies: ResponseDto[];
  createdDate: string;
}

export interface ResponseDto {
  text: string;
  url: string;
}

export interface SurveyReportResponse {
  answers: ReportResponsesReplies[];
}

export interface Pagination {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  sort: Sort;
  size: number;
  number: number;
  empty: boolean;
}

export interface ReportResponses<T> extends Pagination {
  content: T[];
}

export interface PeagableList<T> {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  sort: Sort;
  size: number;
  content: T;
  number: number;
  empty: boolean;
}

export interface Detail {
  question: string;
  replies: string;
  completed: boolean;
}

export interface SelectedResponse {
  respondentId: string;
  date: string;
  questionsCompleted: string;
  details: Detail[];
}

// insights!

export interface LogicalReply {
  replyId: string;
  respondentId: string;
  surveyId: string;
  questionId: number;
  optionId: number;
  reply: string;
  sentiment: string | null;
  nonsense: string | null;
  createdDate: string; // ISO 8601 date string
  modifiedDate: string; // ISO 8601 date string
}

export interface LogicalResponse {
  nextQuestionRefId: string;
  replies: LogicalReply[];
}

export interface DropOffRate {
  surveyId: string;
  questionId: number;
  question: string;
  respondentsStarted: number;
  respondentsCompleted: number;
  dropOffCount: number;
}

export interface InsightsResponse {
  surveyDto: SurveyResponseData;
  starts: number;
  submissions: number;
  completionRate: number;
  timeToComplete: number;
  dropOffRates: DropOffRate[];
}

// Team

export interface AccountMember {
  id: number;
  email: string;
  admin: boolean;
}

export interface UserDto {
  id: number;
  accountId: number;
  admin: boolean;
  stripeCustomerId: string;
  subscriptionPlan: SubscriptionPlan;
  accountMembers: AccountMember[];
  email: string;
  emailVerified: boolean;
  enabledGeneralEmailNotifications: boolean;
  enabledFinishedByRespondentEmailNotifications: boolean;
  account: {
    company: any;
    logoUrl: string;
  };
}

export interface UpdateUserDto {
  email?: string;
  password?: string;
  newPassword?: string;
  enabledGeneralEmailNotifications?: boolean;
  enabledFinishedByRespondentEmailNotifications?: boolean;
}

export interface TeamMemberDTO {
  email: string;
  password: string;
}

export interface CustomError {
  code: string;
  message: string;
  details: string;
}

export interface DistributionResponse {
  status: string;
  message: string;
}

export interface AskQuestionData {
  name: string;
  email: string;
  message: string;
  surveyId?: string;
  questionId?: number;
}

export interface ReferralDto {
  referralId: string;
  accountId: string;
  adminEmail: string;
  createdDate: string;
}

export interface ReferralData {
  referralCode: string;
  referrals: ReferralDto[];
}

// Final page Builder:
export type FinalPageRequestData = {
  type: FinalPagePropertyName;
  text: string;
  redirectUrl?: string;
};

export interface SurveyProperties {
  finalPage: FinalPageRequestData[];
  facebookPixel?: string | null;
}

export interface QuestionProperties {
  pictureOption: boolean;
}

export interface FileData {
  file: File;
  surveyId: string;
  questionId: number;
  optionId: number;
  fileName: string;
}

export interface Passwords {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface AIReport {
  summary: string;
  insights: string[];
  recommendations: string[];
}

export interface CompanyDetails {
  companyName: string;
}

export interface AccountSettingsResponse {
  company: CompanyDetails;
  logoUrl: string;
}

export interface ImageType {
  src: string;
  alt: string;
}
export interface StartSurveyRequest {
  parameters: Record<string, string[]>;
}

export interface ResponseByQuestion {
  questionRefId: string;
  response: OptionResponse[];
}
