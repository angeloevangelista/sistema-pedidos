import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../../config/auth';

import AppError from '../../../errors/AppError';

interface ITokenPayload {
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret) as ITokenPayload;

    request.client = {
      id: decoded.sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token');
  }
}

export default ensureAuthenticated;
