import { SessionStateInterface } from "~/shared/session-state.interface";

class SessionState implements SessionStateInterface {
  id: string;
  isRevealed: boolean = false;
  players: {
    id: string;
    currentCard: string | null;
  }[] = [];
  averagePoint: number = 0;

  constructor(id: string) {
    this.id = id;
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
}

class SessionStateRepository {
  private stores: {
    [key in string]: SessionState;
  } = {};

  create(id: string) {
    this.stores[id] = new SessionState(id);
    return this.stores[id];
  }

  findById(id: string) {
    return this.stores[id];
  }
}

export const sessionStateRepository = new SessionStateRepository();
