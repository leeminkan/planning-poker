import {
  InitUserSessionDto,
  UpdateUserSessionDto,
} from '~/shared/user-session.dto';

import { axiosInstance } from '~/axios';

import { InitUserSessionResponse, UpdateUserSessionResponse } from './types';

export const initUserSessionStateApi = async (payload: InitUserSessionDto) => {
  const res = await axiosInstance.post<InitUserSessionResponse>(
    `/api/user-sessions/init`,
    payload,
  );
  return res.data.data;
};

export const updateUserSessionStateApi = async ({
  id,
  ...payload
}: UpdateUserSessionDto & { id: string }) => {
  const res = await axiosInstance.put<UpdateUserSessionResponse>(
    `/api/user-sessions/${id}`,
    payload,
  );
  return res.data.data;
};
