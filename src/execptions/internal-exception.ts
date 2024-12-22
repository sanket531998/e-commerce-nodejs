import { HttpExceptions } from "./root";

export class InternalException extends HttpExceptions {
  constructor(message: string, errors: any, errorCode: number) {
    super(message, errorCode, 500, errors);
    this.name = "InternalException";
  }
}

// status code for internal eception is 500
