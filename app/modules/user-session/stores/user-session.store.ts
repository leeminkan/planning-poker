import { create } from "zustand";
import { UserSessionInterface } from "~/shared/user-session.interface";

type UserSessionState = {
  id: string;
  name: string;
  currentSessionId?: string;
};
type UserSessionAction = {
  syncUser: (userSessionState: UserSessionInterface) => void;
};
type UserSessionStore = UserSessionState & {
  actions: UserSessionAction;
};
export const useUserSessionStore = create<UserSessionStore>((set) => ({
  id: "",
  name: "",
  currentSessionId: undefined,
  actions: {
    syncUser: (state: UserSessionInterface) =>
      set((userSessionState) => ({ ...state, ...userSessionState })),
  },
}));
