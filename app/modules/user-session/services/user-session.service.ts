import { UpdateUserSessionDto } from '~/shared/user-session.dto';

import { axiosInstance } from '~/axios';

import { UpdateUserSessionResponse } from './types';

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
