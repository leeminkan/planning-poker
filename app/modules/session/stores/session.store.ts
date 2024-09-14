import { create } from "zustand";

type SessionState = {
  activeCard: string | null;
  isRevealed: boolean;
  players: {
    id: number;
    currentCardContent: string | null;
    isMe: boolean;
  }[];
  averagePoint: number;
};
type SessionAction = {
  setActiveCard: (activeCard: SessionState["activeCard"]) => void;
  setIsRevealed: (isRevealed: SessionState["isRevealed"]) => void;
};
type SessionStore = SessionState & {
  actions: SessionAction;
};
export const useSessionStore = create<SessionStore>((set) => ({
  activeCard: null,
  isRevealed: false,
  averagePoint: 0,
  players: [
    {
      id: 1,
      currentCardContent: null,
      isMe: true,
    },
    {
      id: 2,
      currentCardContent: null,
      isMe: false,
    },
  ],
  actions: {
    setActiveCard: (activeCard: SessionState["activeCard"]) =>
      set((state) => ({ ...state, activeCard })),
    setIsRevealed: (isRevealed: SessionState["isRevealed"]) =>
      set((state) => ({ ...state, isRevealed })),
  },
}));
