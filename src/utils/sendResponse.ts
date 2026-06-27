import { Response } from "express";

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
};

const sendResponse = <T>(res: Response, payload: TResponse<T>) => {
  const { statusCode, ...rest } = payload;

  return res.status(statusCode).json(rest);
};

export default sendResponse;
