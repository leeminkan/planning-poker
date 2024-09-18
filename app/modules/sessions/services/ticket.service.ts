import { CreateTicketDto, UpdateTicketDto } from '~/shared/ticket.dto';

import { axiosInstance } from '~/axios';

import { CreateTicketResponse, UpdateTicketResponse } from './types';

export const createTicketApi = async (payload: CreateTicketDto) => {
  const res = await axiosInstance.post<CreateTicketResponse>(
    `/api/tickets`,
    payload,
  );
  return res.data.data;
};

export const updateTicketApi = async ({
  id,
  ...payload
}: UpdateTicketDto & { id: string }) => {
  const res = await axiosInstance.put<UpdateTicketResponse>(
    `/api/tickets/${id}`,
    payload,
  );
  return res.data.data;
};

export const deleteTicketApi = async ({ id }: { id: string }) => {
  const res = await axiosInstance.delete(`/api/tickets/${id}`);
  return res.data.data;
};
