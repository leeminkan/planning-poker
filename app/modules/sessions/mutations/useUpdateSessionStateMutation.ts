import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { SessionStateInterface } from '~/shared/session-state.interface';
import { UpdateSessionDto } from '~/shared/session.dto';

import { updateSessionStateApi } from '../services/session.service';

type UpdateSessionStateMutationParams = {
  onSuccess: (data: SessionStateInterface) => void;
};
export const useUpdateSessionStateMutation = ({
  onSuccess,
}: UpdateSessionStateMutationParams) => {
  const mutation = useMutation({
    mutationFn: async (payload: UpdateSessionDto & { id: string }) => {
      return await updateSessionStateApi(payload);
    },
    onSuccess: onSuccess,
    onError: (error: AxiosError) => {
      console.error(error);
      toast.error('Some thing was wrong!');
    },
  });

  return mutation;
};
