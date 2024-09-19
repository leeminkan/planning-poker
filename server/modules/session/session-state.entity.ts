import { v4 as uuidV4 } from 'uuid';

import {
  Player,
  SessionStateInterface,
  Ticket,
} from '~/shared/session-state.interface';

import { removeUndefinedValuesFromObject } from './utils';

export class SessionState implements SessionStateInterface {
  id: string;
  // persisted state
  tickets: Ticket[] = [];
  name: string;
  // eventually-persisted state
  // game state
  currentTicketId?: Ticket['id'];
  players: Player[] = [];
  isRevealed: boolean = false;
  averagePoint: number = 0;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    tickets,
  }: {
    id?: string;
    name?: string;
    tickets?: Ticket[];
  }) {
    this.id = id ?? uuidV4();
    this.tickets = tickets ?? [];
    this.name = name ?? '';
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

  updatePlayer(playerParam: Partial<Player>) {
    const player = this.players.find((player) => player.id === playerParam.id);
    if (player) {
      Object.assign(player, removeUndefinedValuesFromObject(playerParam));
    }
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

  updateTicket(ticketParam: Ticket) {
    const ticket = this.tickets.find((ticket) => ticket.id === ticketParam.id);
    if (ticket) {
      Object.assign(ticket, removeUndefinedValuesFromObject(ticketParam));
    }
    this.updatedAt = new Date();
    return this;
  }

  removeTicket(ticketId: string) {
    this.tickets = this.tickets.filter((ticket) => ticket.id !== ticketId);
    this.updatedAt = new Date();
    return this;
  }

  update(session: Partial<SessionStateInterface>) {
    Object.assign(this, removeUndefinedValuesFromObject(session));
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

  unselectCardByPlayerId(playerId: string) {
    const player = this.players.find((player) => player.id === playerId);
    if (!player) {
      return;
    }
    player.currentCard = null;
    this.updatedAt = new Date();
    return this;
  }

  setCurrentTicket(ticketId: string) {
    const ticket = this.tickets.find((ticket) => ticket.id === ticketId);
    if (!ticket) {
      return;
    }
    this.currentTicketId = ticket.id;
    this.updatedAt = new Date();
    return this;
  }

  reset() {
    this.players = this.players.map((player) => {
      player.currentCard = null;
      return player;
    });
    this.isRevealed = false;
    this.isRevealed = false;
    this.averagePoint = 0;
    this.currentTicketId = undefined;
    this.updatedAt = new Date();
    return this;
  }
}
