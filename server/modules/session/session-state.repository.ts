import { v4 as uuidv4 } from "uuid";
import { SessionStateInterface } from "~/shared/session-state.interface";

class SessionState implements SessionStateInterface {
  id: string;
  isRevealed: boolean = false;
  players: {
    id: string;
    currentCard: string | null;
  }[] = [];
  averagePoint: number = 0;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = uuidv4();
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

    return this;
  }

  removePlayer(playerId: string) {
    this.players = this.players.filter((player) => player.id !== playerId);
  }

  setIsRevealed(isRevealed: boolean) {
    this.isRevealed = isRevealed;
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
