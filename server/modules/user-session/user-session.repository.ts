import { v4 as uuidv4 } from "uuid";
import { UserSessionInterface } from "~/shared/user-session.interface";

export class UserSession implements UserSessionInterface {
  id: string;
  name: string;
  currentSessionId?: string = undefined;

  constructor() {
    this.id = uuidv4();
    this.name = "NO_NAME";
  }

  setCurrentSession(sessionId: string) {
    this.currentSessionId = sessionId;
  }

  setName(name: string) {
    this.name = name;
  }
}

class UserSessionRepository {
  private stores: {
    [key in string]: UserSession;
  } = {};

  create() {
    const user = new UserSession();
    this.stores[user.id] = new UserSession();
    return user;
  }

  findById(id: string) {
    return this.stores[id];
  }
}

export const userSessionRepository = new UserSessionRepository();
