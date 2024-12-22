import { ErrorCodes, HttpExceptions } from "./root";

export class BadRequestsException extends HttpExceptions {
  constructor(message: string, errorCode: ErrorCodes, error: any) {
    super(message, errorCode, 400, null);
  }
}
