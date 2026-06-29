import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError.js";

const globalErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  let message = "Something went wrong";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;
