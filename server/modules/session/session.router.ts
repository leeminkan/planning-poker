import { Request, Response, Router } from 'express';

import { UpdateSessionDto, updateSessionSchema } from '~/shared/session.dto';
import { SSE_SYNC_SESSION } from '~/shared/socket-event';

import { sessionEventEmitter } from './session-socket.handler';
import { sessionStateRepository } from './session-state.repository';
import { sessionRepository } from './session.repository';
import { sessionService } from './session.service';

const sessionRouter = Router();

sessionRouter.get('/:id', async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(404).send({
      message: 'Not found!',
    });
  }

  const sessionState =
    await sessionService.getOrCreateSessionStateFromPersistedSession({
      sessionId: req.params.id,
    });

  if (!sessionState) {
    return res.status(404).send({
      message: 'Not found!',
    });
  }

  return res.send({
    data: sessionState,
  });
});

sessionRouter.post('/', async (req: Request, res: Response) => {
  const session = sessionStateRepository.create();
  await sessionRepository
    .create({
      id: session.id,
      name: '',
    })
    .catch((error) => {
      sessionStateRepository.removeById(session.id);
      throw error;
    });

  return res.send({
    data: session,
  });
});

sessionRouter.put('/:id', async (req: Request, res: Response, next) => {
  try {
    const body: UpdateSessionDto = updateSessionSchema.parse(req.body);
    const persistedSession = await sessionRepository.findById(req.params.id);
    if (!persistedSession) {
      return res.status(404).send({
        message: 'Session not found!',
      });
    }

    const updatedSession = await sessionRepository.save({
      ...persistedSession,
      ...body,
    });

    const sessionState = sessionStateRepository.findById(updatedSession.id);
    if (sessionState) {
      sessionState.update(updatedSession);
      sessionEventEmitter.emit(SSE_SYNC_SESSION, sessionState);
    }

    return res.send({
      data: updatedSession,
    });
  } catch (error) {
    next(error);
  }
});

export { sessionRouter };
