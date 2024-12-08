import APIError from './ErrorAPI';

export async function handleResponse(response: Response, context: string) {
  const text = await response.text();

  if (!text) {
    if (!response.ok) {
      console.error(
        `Error in ${context}: No data returned with HTTP status ${response.status}.`
      );
      throw new APIError(
        response.status,
        'No data returned',
        'UNEXPECTED_ERROR',
        'The response returned an empty body.'
      );
    }
    return {};
  }

  let data: any;
  try {
    data = JSON.parse(text);
  } catch (error) {
    console.error(`Error in ${context}: Unable to parse JSON from response.`);
    if (!response.ok) {
      throw new APIError(
        response.status,
        'Failed to parse JSON',
        'UNEXPECTED_ERROR',
        (error as Error).toString()
      );
    }
    return {};
  }

  if (!response.ok) {
    if (response.status >= 500 && response.status < 600) {
      console.error(`API error in ${context}:`, {
        status: response.status,
        message: data.message,
        code: data.code,
        details: data.details,
      });
    }
    throw new APIError(
      response.status,
      data.message || 'Error without a message',
      data.code || 'UNEXPECTED_ERROR',
      data.details || 'No additional details provided.'
    );
  }

  return data;
}
