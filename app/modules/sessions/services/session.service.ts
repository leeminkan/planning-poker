import { UpdateSessionDto } from '~/shared/session.dto';

import { axiosInstance } from '~/axios';

import {
  CreateSessionStateResponse,
  GetSessionStateResponse,
  UpdateSessionStateResponse,
} from './types';

export const getSessionState = async ({ id }: { id: string }) => {
  const res = await axiosInstance.get<GetSessionStateResponse>(
    `/api/sessions/${id}`,
  );
  return res.data.data;
};

export const createSessionState = async () => {
  const res = await axiosInstance.post<CreateSessionStateResponse>(
    `/api/sessions`,
  );
  return res.data.data;
};

export const updateSessionStateApi = async ({
  id,
  ...payload
}: UpdateSessionDto & { id: string }) => {
  const res = await axiosInstance.put<UpdateSessionStateResponse>(
    `/api/sessions/${id}`,
    payload,
  );
  return res.data.data;
};
