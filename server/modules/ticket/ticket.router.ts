import { Request, Response, Router } from 'express';

import { SSE_SYNC_SESSION } from '~/shared/socket-event';
import {
  CreateTicketDto,
  UpdateTicketDto,
  createTicketSchema,
  updateTicketSchema,
} from '~/shared/ticket.dto';

import { sessionEventEmitter } from '../session/session-socket.handler';
import { sessionStateRepository } from '../session/session-state.repository';
import { sessionRepository } from '../session/session.repository';
import { ticketRepository } from './ticket.repository';

const ticketRouter = Router();

ticketRouter.post('/', async (req: Request, res: Response, next) => {
  try {
    const body: CreateTicketDto = createTicketSchema.parse(req.body);
    const persistedSession = await sessionRepository.findById(body.sessionId);
    if (!persistedSession) {
      return res.status(404).send({
        message: 'Session not found!',
      });
    }

    if (body.jiraId && body.jiraIssueId) {
      const existedTicket = await ticketRepository.findBySessionAndJira({
        sessionId: body.sessionId,
        jiraId: body.jiraId,
        jiraIssueId: body.jiraIssueId,
      });

      if (existedTicket) {
        return res.send({
          data: existedTicket,
        });
      }
    }

    const ticket = await ticketRepository.create(body);

    const sessionState = sessionStateRepository.findById(body.sessionId);
    if (sessionState) {
      sessionState.addTicket(ticket);
      sessionEventEmitter.emit(SSE_SYNC_SESSION, sessionState);
    }

    return res.send({
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
});

ticketRouter.put('/:id', async (req: Request, res: Response, next) => {
  try {
    const body: UpdateTicketDto = updateTicketSchema.parse(req.body);
    const persistedTicket = await ticketRepository.findById(req.params.id);
    if (!persistedTicket) {
      return res.status(404).send({
        message: 'Ticket not found!',
      });
    }

    const updatedTicket = await ticketRepository.save({
      ...persistedTicket,
      ...body,
    });

    const sessionState = sessionStateRepository.findById(
      updatedTicket.sessionId,
    );
    if (sessionState) {
      sessionState.updateTicket(updatedTicket);
      sessionEventEmitter.emit(SSE_SYNC_SESSION, sessionState);
    }

    return res.send({
      data: updatedTicket,
    });
  } catch (error) {
    next(error);
  }
});

ticketRouter.delete('/:id', async (req: Request, res: Response, next) => {
  try {
    const persistedTicket = await ticketRepository.findById(req.params.id);
    if (!persistedTicket) {
      return res.status(404).send({
        message: 'Ticket not found!',
      });
    }

    await ticketRepository.removeById(req.params.id);

    const sessionState = sessionStateRepository.findById(
      persistedTicket.sessionId,
    );
    if (sessionState) {
      sessionState.removeTicket(persistedTicket.id);
      sessionEventEmitter.emit(SSE_SYNC_SESSION, sessionState);
    }

    return res.send({
      message: 'Ok',
    });
  } catch (error) {
    next(error);
  }
});

export { ticketRouter };
