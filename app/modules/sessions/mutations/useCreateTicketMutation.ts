import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { Ticket } from '~/shared/session-state.interface';
import { CreateTicketDto } from '~/shared/ticket.dto';

import { createTicketApi } from '../services/ticket.service';

type CreateTicketMutationParams = {
  onSuccess: (data: Ticket) => void;
};
export const useCreateTicketMutation = ({
  onSuccess,
}: CreateTicketMutationParams) => {
  const mutation = useMutation({
    mutationFn: async (payload: CreateTicketDto) => {
      return await createTicketApi(payload);
    },
    onSuccess: (data) => {
      toast.info('Add ticket successfully!');
      onSuccess(data);
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast.error('Some thing was wrong!');
    },
  });

  return mutation;
};
