import { create } from 'zustand';

import { UserSessionStateInterface } from '~/shared/user-session.interface';

type UserSessionState = {
  id: string;
  name: string;
  currentSessionId?: string;
};
type UserSessionAction = {
  syncUser: (userSessionState: UserSessionStateInterface) => void;
  setName: (name: string) => void;
};
type UserSessionStore = UserSessionState & {
  actions: UserSessionAction;
};
export const useUserSessionStore = create<UserSessionStore>((set) => ({
  id: '',
  name: '',
  currentSessionId: undefined,
  actions: {
    syncUser: (userSessionState: UserSessionStateInterface) =>
      set((state) => ({ ...state, ...userSessionState })),
    setName: (name: string) => set((state) => ({ ...state, name })),
  },
}));
