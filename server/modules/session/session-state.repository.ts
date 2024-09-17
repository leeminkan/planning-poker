import { Ticket } from '~/shared/session-state.interface';

import { SessionState } from './session-state.entity';

class SessionStateRepository {
  private stores: {
    [key in string]: SessionState;
  } = {};

  create({ id, tickets }: { id?: string; tickets?: Ticket[] } = {}) {
    const newSession = new SessionState({ id, tickets });
    this.stores[newSession.id] = newSession;
    return this.stores[newSession.id];
  }

  findById(id: string) {
    return this.stores[id];
  }

  removeById(id: string) {
    delete this.stores[id];
  }
}

export const sessionStateRepository = new SessionStateRepository();
