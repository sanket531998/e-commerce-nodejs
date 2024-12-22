class HttpExceptions extends Error {
  message: string;
  errorCode: any;
  statusCode: number;
  error: any;

  constructor(message: string, errorCode: any, statusCode: number, error: any) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.error = error;
  }
}
