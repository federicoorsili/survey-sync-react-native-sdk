import type {
  AccountSettingsResponse,
  SurveyStartedResponse,
  OptionResponse,
  SurveyReply,
} from '../types/types';
import { handleResponse } from './handleResponse';

const apiUrl = 'https://api.survey-sync.com/api/v1';

export const fetchAccountSettings = async (
  alias: string
): Promise<AccountSettingsResponse> => {
  const url = `${apiUrl}/public/account-settings?surveyAlias=${alias}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response, 'fetchAccountSettings');
};

export const fetchSurveyDataByAlias = async (alias: string) => {
  const url = `${apiUrl}/survey/alias/${alias}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
};

export const startSurvey = async (
  surveyId: string
): Promise<SurveyStartedResponse> => {
  const url = `${apiUrl}/reply/start/survey/${surveyId}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response, 'startSurvey');
};

export const submitReply = async (
  surveyId: string,
  respondentId: string,
  questionId: number,
  replies: OptionResponse[],
  isFinished: boolean
): Promise<SurveyReply[]> => {
  const url = `${apiUrl}/reply`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      surveyId: surveyId,
      respondentId: respondentId,
      questionId: questionId,
      replies: replies.flat(),
      isFinished: isFinished,
    }),
  });
  return handleResponse(response, 'submitReply');
};

export const createRespondentFileUploadLink = async (
  surveyId: string,
  questionId: number,
  respondentId: string,
  fileName: string
) => {
  const url = `${apiUrl}/reply/pre-sign-url/survey/${surveyId}/question/${questionId}/respondent/${respondentId}?fileName=${fileName}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleResponse(response, 'createRespondentFileUploadLink');
};

export const uploadFile = async (file: File, presignedUrl: string) => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });
  return response;
};
