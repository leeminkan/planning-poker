import { v4 as uuidv4 } from 'uuid';

import { UserSessionStateInterface } from '~/shared/user-session.interface';

import { removeUndefinedValuesFromObject } from '../session/utils';

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

  update(session: Partial<UserSessionState>) {
    return Object.assign(this, removeUndefinedValuesFromObject(session));
  }
}
