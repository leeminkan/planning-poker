import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { UpdateUserSessionDto } from '~/shared/user-session.dto';
import { UserSessionStateInterface } from '~/shared/user-session.interface';

import { updateUserSessionStateApi } from '../services/user-session.service';

type UpdateUserSessionStateMutationParams = {
  onSuccess: (data: UserSessionStateInterface) => void;
};
export const useUpdateUserSessionStateMutation = ({
  onSuccess,
}: UpdateUserSessionStateMutationParams) => {
  const mutation = useMutation({
    mutationFn: async (payload: UpdateUserSessionDto & { id: string }) => {
      return await updateUserSessionStateApi(payload);
    },
    onSuccess: onSuccess,
    onError: (error: AxiosError) => {
      console.error(error);
      toast.error('Some thing was wrong!');
    },
  });

  return mutation;
};
