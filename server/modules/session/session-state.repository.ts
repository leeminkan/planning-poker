import { v4 as uuidV4 } from "uuid";
import {
  Player,
  SessionStateInterface,
  Ticket,
} from "~/shared/session-state.interface";

class SessionState implements SessionStateInterface {
  id: string;
  players: Player[] = [];
  isRevealed: boolean = false;
  averagePoint: number = 0;
  tickets: Ticket[] = [];
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = uuidV4();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  addNewPlayer(playerParam: Omit<Player, "currentCard">) {
    const isExisted = this.players.find(
      (player) => player.id === playerParam.id
    );
    if (!isExisted) {
      this.players.push({
        ...playerParam,
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

  addTicket(ticketParam: Ticket) {
    const isExisted = this.tickets.find(
      (player) => player.id === ticketParam.id
    );
    if (!isExisted) {
      this.tickets.push(ticketParam);
    }
    this.updatedAt = new Date();
    return this;
  }

  setIsRevealed(isRevealed: boolean) {
    this.isRevealed = isRevealed;
    const filteredPlayers = this.players.filter(
      (player) =>
        player.currentCard !== null && !isNaN(Number(player.currentCard))
    );
    const sum = filteredPlayers.reduce((acc, player) => {
      return acc + Number(player.currentCard);
    }, 0);
    this.averagePoint =
      filteredPlayers.length !== 0 ? sum / filteredPlayers.length : 0;
    this.updatedAt = new Date();
    return this;
  }

  chooseCardByPlayerId(playerId: string, card: string) {
    const player = this.players.find((player) => player.id === playerId);
    if (!player) {
      return;
    }
    player.currentCard = card;
    this.updatedAt = new Date();
    return this;
  }

  reset() {
    this.players = this.players.map((player) => {
      player.currentCard = null;
      return player;
    });
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
    // add default tickets
    // TODO: remove this later
    newSession.addTicket({
      id: uuidV4(),
      title: "CFA-1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    });
    newSession.addTicket({
      id: uuidV4(),
      title: "CFA-2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    });
    newSession.addTicket({
      id: uuidV4(),
      title: "CFA-3",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    });
    newSession.addTicket({
      id: uuidV4(),
      title: "CFA-4",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    });
    this.stores[newSession.id] = newSession;
    return this.stores[newSession.id];
  }

  findById(id: string) {
    return this.stores[id];
  }
}

export const sessionStateRepository = new SessionStateRepository();
