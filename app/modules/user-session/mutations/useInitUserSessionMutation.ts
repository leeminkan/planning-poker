import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { UserSessionStateInterface } from '~/shared/user-session.interface';

import { getLocalStorageItem } from '~/local-storage';

import { initUserSessionStateApi } from '../services/user-session.service';
import { useUserSessionStore } from '../stores/user-session.store';

export const useInitUserSessionStateMutation = () => {
  const { syncUser } = useUserSessionStore((state) => state.actions);
  const mutation = useMutation({
    mutationFn: async () => {
      const userState = getLocalStorageItem<{
        state: UserSessionStateInterface;
      }>('user-session-store');
      return await initUserSessionStateApi({
        id: userState?.state.id,
        name: userState?.state.name,
      });
    },
    onSuccess: (data) => {
      syncUser(data);
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast.error('Some thing was wrong!');
    },
  });

  return mutation;
};
