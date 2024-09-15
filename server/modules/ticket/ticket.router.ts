import { Router, Request, Response } from "express";

import { ticketRepository } from "./ticket.repository";
import { sessionRepository } from "../session/session.repository";
import { sessionStateRepository } from "../session/session-state.repository";
import { CreateTicketDto, createTicketSchema } from "./validate-schema";
import { sessionEventEmitter } from "../session/session-socket.handler";
import { SSE_SYNC_SESSION } from "~/shared/socket-event";

const ticketRouter = Router();

ticketRouter.post("/", async (req: Request, res: Response, next) => {
  try {
    const body: CreateTicketDto = createTicketSchema.parse(req.body);
    const persistedSession = await sessionRepository.findById(body.sessionId);
    if (!persistedSession) {
      return res.status(404).send({
        message: "Session not found!",
      });
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

export { ticketRouter };
