import { NextFunction, Request, Response } from "express";
import { ErrorCodes, HttpExceptions } from "./execptions/root";
import { InternalException } from "./execptions/internal-exception";

export const errorHandler = (method: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      method(req, res, next);
    } catch (error: any) {
      let execption: HttpExceptions;
      if (error instanceof HttpExceptions) {
        execption = error;
      } else {
        execption = new InternalException(
          "Something went wrong!",
          error,
          ErrorCodes.INTERNAL_EXCEPTION
        );
      }

      next(execption);
    }
  };
};
