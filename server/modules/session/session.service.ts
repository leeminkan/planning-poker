import { ticketRepository } from '~/server/modules/ticket/ticket.repository';

import { sessionStateRepository } from './session-state.repository';
import { sessionRepository } from './session.repository';

class SessionService {
  async createSessionStateFromPersistedSession({
    sessionId,
  }: {
    sessionId: string;
  }) {
    const persistedSession = await sessionRepository.findById(sessionId);
    if (!persistedSession) return null;
    const tickets = await ticketRepository.findAllBySessionId(sessionId);
    const sessionState = sessionStateRepository.create({
      id: sessionId,
      tickets,
    });
    return sessionState;
  }

  async getOrCreateSessionStateFromPersistedSession({
    sessionId,
  }: {
    sessionId: string;
  }) {
    const sessionState = sessionStateRepository.findById(sessionId);
    if (sessionState) return sessionState;
    return await this.createSessionStateFromPersistedSession({
      sessionId,
    });
  }
}

export const sessionService = new SessionService();
