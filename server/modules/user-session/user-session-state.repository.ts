import { UserSessionState } from './user-session-state.entity';

class UserSessionStateRepository {
  private stores: {
    [key in string]: UserSessionState;
  } = {};

  create() {
    const user = new UserSessionState();
    this.stores[user.id] = user;
    return user;
  }

  findById(id: string) {
    return this.stores[id];
  }
}

export const userSessionStateRepository = new UserSessionStateRepository();
