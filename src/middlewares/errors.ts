import { NextFunction, Request, Response } from "express";
import { HttpExceptions } from "../execptions/root";

const errorMiddleware = (
  error: HttpExceptions,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
    error: error.error,
  });
};

export default errorMiddleware;
// Special convention in express middleware => first argument is the error object
