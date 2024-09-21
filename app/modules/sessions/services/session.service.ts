import { UpdateSessionDto } from '~/shared/session.dto';

import { axiosInstance, getAuthAxiosInstance } from '~/axios';

import {
  CreateSessionStateResponse,
  GetRecentSessionsResponse,
  GetSessionStateResponse,
  UpdateSessionStateResponse,
} from './types';

export const createSessionState = async () => {
  const res = await axiosInstance.post<CreateSessionStateResponse>(
    `/api/sessions`,
  );
  return res.data.data;
};

export const getRecentSessions = async () => {
  const res = await axiosInstance.get<GetRecentSessionsResponse>(
    `/api/sessions/recent`,
  );
  return res.data.data;
};

export const getSessionState = async ({ id }: { id: string }) => {
  const res = await getAuthAxiosInstance().get<GetSessionStateResponse>(
    `/api/sessions/${id}`,
  );
  return res.data.data;
};

export const updateSessionStateApi = async ({
  id,
  ...payload
}: UpdateSessionDto & { id: string }) => {
  const res = await getAuthAxiosInstance().put<UpdateSessionStateResponse>(
    `/api/sessions/${id}`,
    payload,
  );
  return res.data.data;
};
