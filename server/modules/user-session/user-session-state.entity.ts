import { v4 as uuidv4 } from 'uuid';

import { UserSessionStateInterface } from '~/shared/user-session.interface';

export class UserSessionState implements UserSessionStateInterface {
  id: string;
  name?: string = undefined;
  currentSessionId?: string = undefined;

  constructor() {
    this.id = uuidv4();
  }

  setCurrentSession(sessionId: string) {
    this.currentSessionId = sessionId;
  }

  setName(name: string) {
    this.name = name;
  }
}
