export class HttpExceptions extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  error: ErrorCodes;

  constructor(
    message: string,
    errorCode: ErrorCodes,
    statusCode: number,
    error: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.error = error;
  }
}

export enum ErrorCodes {
  USER_NOT_FOUND = 404, // 404 Not Found: The user does not exist.
  USER_ALREADY_EXISTS = 409, // 409 Conflict: Indicates a conflict due to an existing resource.
  INVALID_PASSWORD = 401, // 401 Unauthorized: Incorrect password (authentication failed).
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001,
}
