import { Request, Response, Router } from 'express';

import { SSE_SYNC_SESSION, SSE_SYNC_USER } from '~/shared/socket-event';
import {
  UpdateUserSessionDto,
  updateUserSessionSchema,
} from '~/shared/user-session.dto';

import { sessionEventEmitter } from '../session/session-socket.handler';
import { sessionStateRepository } from '../session/session-state.repository';
import { userSessionStateRepository } from './user-session-state.repository';

const userSessionRouter = Router();

userSessionRouter.put('/:id', async (req: Request, res: Response, next) => {
  try {
    const body: UpdateUserSessionDto = updateUserSessionSchema.parse(req.body);
    const userSession = await userSessionStateRepository.findById(
      req.params.id,
    );
    if (!userSession) {
      return res.status(404).send({
        message: 'User Session not found!',
      });
    }

    userSession.update(body);

    if (userSession.currentSessionId) {
      const sessionState = sessionStateRepository.findById(
        userSession.currentSessionId,
      );
      if (sessionState) {
        sessionState.updatePlayer(userSession);
        sessionEventEmitter.emit(SSE_SYNC_SESSION, sessionState);
      }
    }

    sessionEventEmitter.emit(SSE_SYNC_USER, userSession);

    return res.send({
      data: userSession,
    });
  } catch (error) {
    next(error);
  }
});

export { userSessionRouter };
