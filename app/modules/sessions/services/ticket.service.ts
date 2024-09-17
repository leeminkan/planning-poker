import { CreateTicketDto } from '~/shared/ticket.dto';

import { axiosInstance } from '~/axios';

import { CreateTicketResponse } from './types';

export const createTicketApi = async (payload: CreateTicketDto) => {
  const res = await axiosInstance.post<CreateTicketResponse>(
    `/api/tickets`,
    payload,
  );
  return res.data.data;
};
