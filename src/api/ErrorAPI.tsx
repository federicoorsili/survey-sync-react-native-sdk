export default class APIError extends Error {
  status: number;
  code: string;
  details?: string;

  constructor(status: number, message: string, code: string, details?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, APIError.prototype);
  }
}
