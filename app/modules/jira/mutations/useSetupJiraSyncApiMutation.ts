import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { SetupSyncDto } from '~/shared/jira.dto';

import { setupJiraSyncApi } from '../services/jira.service';

type SetupJiraSyncApiMutationParams = {
  onSuccess: () => void;
};
export const useSetupJiraSyncApiMutation = ({
  onSuccess,
}: SetupJiraSyncApiMutationParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: SetupSyncDto) => {
      return await setupJiraSyncApi(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['@@jira', 'detail'] });
      toast.info('Setup successfully!');
      onSuccess();
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast.error('Some thing was wrong!');
    },
  });

  return mutation;
};
