import { create } from "zustand";

import { SessionStateInterface } from "~/shared/session-state.interface";
import {
  SLE_RESET_SESSION,
  SLE_SET_IS_REVEALED_SESSION,
} from "~/shared/socket-event";
import {
  SLEResetSessionPayload,
  SLESetIsRevealedSessionPayload,
} from "~/shared/socket-event.types";

import SocketClient from "../socket-client";

type SessionState = {
  id: string;
  activeCard: string | null;
  isRevealed: boolean;
  players: {
    id: string;
    currentCard: string | null;
  }[];
  averagePoint: number;
};
type SessionAction = {
  setActiveCard: (activeCard: SessionState["activeCard"]) => void;
  setIsRevealed: (isRevealed: SessionState["isRevealed"]) => void;
  syncSessionState: (sessionState: SessionStateInterface) => void;
  reset: () => void;
};
type SessionStore = SessionState & {
  actions: SessionAction;
};
export const useSessionStore = create<SessionStore>((set) => ({
  id: "",
  activeCard: null,
  isRevealed: false,
  averagePoint: 0,
  players: [],
  actions: {
    setActiveCard: (activeCard: SessionState["activeCard"]) =>
      set((state) => ({ ...state, activeCard })),
    setIsRevealed: (isRevealed: SessionState["isRevealed"]) => {
      set((state) => {
        SocketClient.getInstance().emit(SLE_SET_IS_REVEALED_SESSION, {
          sessionId: state.id,
          isRevealed: true,
        } as SLESetIsRevealedSessionPayload);
        return { ...state, isRevealed };
      });
    },
    syncSessionState: (sessionState: SessionStateInterface) =>
      set((state) => ({ ...state, ...sessionState })),
    reset: () =>
      set((state) => {
        SocketClient.getInstance().emit(SLE_RESET_SESSION, {
          sessionId: state.id,
        } as SLEResetSessionPayload);
        return {
          ...state,
          isRevealed: false,
          averagePoint: 0,
        };
      }),
  },
}));
