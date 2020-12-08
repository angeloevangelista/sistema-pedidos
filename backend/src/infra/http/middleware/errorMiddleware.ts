/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';

import AppError from '../../../errors/AppError';

export interface IErrorResponseBody {
  status: string;
  message: string;
}

function errorMiddleware(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
) {
  let statusCode = 500;
  const responseBody: IErrorResponseBody = {
    status: 'error',
    message: 'Internal server error.',
  };

  if (err instanceof AppError) {
    statusCode = err.statusCode;

    responseBody.message = err.message;
  }

  console.log(`An error occurred: ${err.message}`);

  return response.status(statusCode).json(responseBody);
}

export default errorMiddleware;
