import axios from 'axios';

import { UserSessionStateInterface } from '~/shared/user-session.interface';

import { getLocalStorageItem } from './local-storage';

export const axiosInstance = axios.create({
  baseURL:
    typeof window !== 'undefined' ? window.ENV.HOST : 'http://localhost:3000',
  timeout: 5000,
});

export const getAuthAxiosInstance = () => {
  const userState = getLocalStorageItem<{ state: UserSessionStateInterface }>(
    'user-session-store',
  );

  return axios.create({
    baseURL:
      typeof window !== 'undefined' ? window.ENV.HOST : 'http://localhost:3000',
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${userState?.state.id}`,
    },
  });
};
