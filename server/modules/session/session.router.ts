import { Request, Response, Router } from 'express';

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

export { sessionRouter };
