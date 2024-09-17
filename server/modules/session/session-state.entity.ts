import { v4 as uuidV4 } from 'uuid';

import {
  Player,
  SessionStateInterface,
  Ticket,
} from '~/shared/session-state.interface';

export class SessionState implements SessionStateInterface {
  id: string;
  players: Player[] = [];
  isRevealed: boolean = false;
  averagePoint: number = 0;
  tickets: Ticket[] = [];
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, tickets }: { id?: string; tickets?: Ticket[] }) {
    this.id = id ?? uuidV4();
    this.tickets = tickets ?? [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  addNewPlayer(playerParam: Omit<Player, 'currentCard'>) {
    const isExisted = this.players.find(
      (player) => player.id === playerParam.id,
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
      (ticket) => ticket.id === ticketParam.id,
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
        player.currentCard !== null && !isNaN(Number(player.currentCard)),
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
