import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { Ticket } from '~/shared/session-state.interface';
import { UpdateTicketDto } from '~/shared/ticket.dto';

import { updateTicketApi } from '../services/ticket.service';

type UpdateTicketMutationParams = {
  onSuccess: (data: Ticket) => void;
};
export const useUpdateTicketMutation = ({
  onSuccess,
}: UpdateTicketMutationParams) => {
  const mutation = useMutation({
    mutationFn: async (payload: UpdateTicketDto & { id: string }) => {
      return await updateTicketApi(payload);
    },
    onSuccess: (data) => {
      toast.info('Update successfully!');
      onSuccess(data);
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast.error('Some thing was wrong!');
    },
  });

  return mutation;
};
