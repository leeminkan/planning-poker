import { v4 as uuidV4 } from "uuid";
import { SessionStateInterface } from "~/shared/session-state.interface";

class SessionState implements SessionStateInterface {
  id: string;
  players: {
    id: string;
    currentCard: string | null;
  }[] = [];
  isRevealed: boolean = false;
  averagePoint: number = 0;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = uuidV4();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  addNewPlayer(playerId: string) {
    const isExisted = this.players.find((player) => player.id === playerId);
    if (!isExisted) {
      this.players.push({
        id: playerId,
        currentCard: null,
      });
    }
    this.updatedAt = new Date();

    return this;
  }

  removePlayer(playerId: string) {
    this.players = this.players.filter((player) => player.id !== playerId);
    this.updatedAt = new Date();
    return this;
  }

  setIsRevealed(isRevealed: boolean) {
    this.isRevealed = isRevealed;
    this.updatedAt = new Date();
    return this;
  }

  reset() {
    this.isRevealed = false;
    this.averagePoint = 0;
    this.updatedAt = new Date();
    return this;
  }
}

class SessionStateRepository {
  private stores: {
    [key in string]: SessionState;
  } = {};

  create() {
    const newSession = new SessionState();
    this.stores[newSession.id] = newSession;
    return this.stores[newSession.id];
  }

  findById(id: string) {
    return this.stores[id];
  }
}

export const sessionStateRepository = new SessionStateRepository();
