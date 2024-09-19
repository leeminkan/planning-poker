import { create } from 'zustand';

import {
  SessionStateInterface,
  Ticket,
} from '~/shared/session-state.interface';
import {
  SLE_CHOOSE_CARD,
  SLE_CHOOSE_TICKET,
  SLE_RESET_SESSION,
  SLE_SET_IS_REVEALED_SESSION,
  SLE_UNSELECT_CARD,
} from '~/shared/socket-event';
import {
  SLEChooseCardPayload,
  SLEChooseTicketPayload,
  SLEResetSessionPayload,
  SLESetIsRevealedSessionPayload,
} from '~/shared/socket-event.types';

import SocketClient from '../socket-client';

type SessionState = SessionStateInterface;
type SessionAction = {
  chooseCardByPlayerId: (playerId: string, card: string) => void;
  unselectCardByPlayerId: (playerId: string) => void;
  setIsRevealed: (isRevealed: SessionState['isRevealed']) => void;
  chooseTicket: (ticketId: Ticket['id']) => void;
  syncSessionState: (sessionState: SessionStateInterface) => void;
  reset: () => void;
  resetRound: () => void;
};
type SessionStore = SessionState & {
  actions: SessionAction;
};
export const useSessionStore = create<SessionStore>((set) => ({
  id: '',
  name: '',
  currentTicketId: undefined,
  activeCard: null,
  isRevealed: false,
  averagePoint: 0,
  players: [],
  tickets: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  actions: {
    chooseCardByPlayerId: (playerId: string, card: string) =>
      set((state) => {
        SocketClient.getInstance().emit(SLE_CHOOSE_CARD, {
          sessionId: state.id,
          card,
        } as SLEChooseCardPayload);
        const player = state.players.find((player) => player.id === playerId);
        if (player) {
          player.currentCard = card;
        }
        return { ...state };
      }),
    unselectCardByPlayerId: (playerId: string) =>
      set((state) => {
        SocketClient.getInstance().emit(SLE_UNSELECT_CARD, {
          sessionId: state.id,
        } as SLEChooseCardPayload);
        const player = state.players.find((player) => player.id === playerId);
        if (player) {
          player.currentCard = null;
        }
        return { ...state };
      }),
    chooseTicket: (ticketId: Ticket['id']) =>
      set((state) => {
        SocketClient.getInstance().emit(SLE_CHOOSE_TICKET, {
          sessionId: state.id,
          ticketId,
        } as SLEChooseTicketPayload);
        const ticket = state.tickets.find((ticket) => ticket.id === ticketId);
        if (!ticket) {
          return state;
        }
        return { ...state, currentTicketId: ticket.id };
      }),
    setIsRevealed: (isRevealed: SessionState['isRevealed']) => {
      set((state) => {
        SocketClient.getInstance().emit(SLE_SET_IS_REVEALED_SESSION, {
          sessionId: state.id,
          isRevealed: true,
        } as SLESetIsRevealedSessionPayload);
        const filteredPlayers = state.players.filter(
          (player) =>
            player.currentCard !== null && !isNaN(Number(player.currentCard)),
        );
        const sum = filteredPlayers.reduce((acc, player) => {
          return acc + Number(player.currentCard);
        }, 0);
        const averagePoint =
          filteredPlayers.length !== 0 ? sum / filteredPlayers.length : 0;
        return { ...state, isRevealed, averagePoint };
      });
    },
    syncSessionState: (sessionState: SessionStateInterface) =>
      set((state) => ({ ...state, ...sessionState })),
    reset: () =>
      set((state) => {
        SocketClient.getInstance().emit(SLE_RESET_SESSION, {
          sessionId: state.id,
        } as SLEResetSessionPayload);
        const players = state.players.map((player) => {
          player.currentCard = null;
          return player;
        });
        return {
          ...state,
          id: '',
          name: '',
          isRevealed: false,
          averagePoint: 0,
          players,
          currentTicketId: undefined,
        };
      }),
    resetRound: () =>
      set((state) => {
        SocketClient.getInstance().emit(SLE_RESET_SESSION, {
          sessionId: state.id,
        } as SLEResetSessionPayload);
        const players = state.players.map((player) => {
          player.currentCard = null;
          return player;
        });
        return {
          ...state,
          isRevealed: false,
          averagePoint: 0,
          players,
          currentTicketId: undefined,
        };
      }),
  },
}));
