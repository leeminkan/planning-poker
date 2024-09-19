import { NextFunction, Request, Response } from 'express';

import { UserSessionStateInterface } from '~/shared/user-session.interface';

import { userSessionStateRepository } from './modules/user-session/user-session-state.repository';

export type RequestWithUser = Request & {
  user: UserSessionStateInterface;
};

export const authenticateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const user = userSessionStateRepository.findById(token);

  if (!user) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  (req as RequestWithUser).user = user;
  next();
};
