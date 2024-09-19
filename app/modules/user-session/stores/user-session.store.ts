import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { UserSessionStateInterface } from '~/shared/user-session.interface';

type UserSessionState = UserSessionStateInterface;
type UserSessionAction = {
  syncUser: (userSessionState: UserSessionStateInterface) => void;
  setName: (name: string) => void;
};
type UserSessionStore = UserSessionState & {
  actions: UserSessionAction;
};
export const useUserSessionStore = create(
  persist<UserSessionStore>(
    (set) => ({
      id: '',
      name: '',
      currentSessionId: undefined,
      actions: {
        syncUser: (userSessionState: UserSessionStateInterface) =>
          set((state) => ({ ...state, ...userSessionState })),
        setName: (name: string) => set((state) => ({ ...state, name })),
      },
    }),
    {
      name: 'user-session-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !['currentSessionId', 'actions'].includes(key),
          ),
        ) as UserSessionStore,
    },
  ),
);
