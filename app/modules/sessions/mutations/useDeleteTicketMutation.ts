import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { deleteTicketApi } from '../services/ticket.service';

type DeleteTicketMutationParams = {
  onSuccess: () => void;
};
export const useDeleteTicketMutation = ({
  onSuccess,
}: DeleteTicketMutationParams) => {
  const mutation = useMutation({
    mutationFn: async (payload: { id: string }) => {
      return await deleteTicketApi(payload);
    },
    onSuccess: onSuccess,
    onError: (error: AxiosError) => {
      console.error(error);
      toast.error('Some thing was wrong!');
    },
  });

  return mutation;
};
