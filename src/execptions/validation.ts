import { ErrorCodes, HttpExceptions } from "./root";

export class UnprocessableEntityException extends HttpExceptions {
  constructor(error: any, message: string, errorCode: number) {
    super(message, errorCode, 422, error);
  }
}
