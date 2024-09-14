import { v4 as uuidv4 } from "uuid";

export class User {
  id: string;
  currentSessionId?: string = undefined;

  constructor() {
    this.id = uuidv4();
  }

  setCurrentSession(sessionId: string) {
    this.currentSessionId = sessionId;
  }
}

class UserRepository {
  private stores: {
    [key in string]: User;
  } = {};

  create() {
    const user = new User();
    this.stores[user.id] = new User();
    return user;
  }

  findById(id: string) {
    return this.stores[id];
  }
}

export const userRepository = new UserRepository();
