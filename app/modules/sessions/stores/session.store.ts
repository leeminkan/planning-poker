import { create } from "zustand";
import { SessionStateInterface } from "~/shared/session-state.interface";

type SessionState = {
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
};
type SessionStore = SessionState & {
  actions: SessionAction;
};
export const useSessionStore = create<SessionStore>((set) => ({
  activeCard: null,
  isRevealed: false,
  averagePoint: 0,
  players: [],
  actions: {
    setActiveCard: (activeCard: SessionState["activeCard"]) =>
      set((state) => ({ ...state, activeCard })),
    setIsRevealed: (isRevealed: SessionState["isRevealed"]) =>
      set((state) => ({ ...state, isRevealed })),
    syncSessionState: (sessionState: SessionStateInterface) =>
      set((state) => ({ ...state, ...sessionState })),
  },
}));
