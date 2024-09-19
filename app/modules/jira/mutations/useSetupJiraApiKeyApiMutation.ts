import { AxiosError } from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { SetupApiKeyDto } from '~/shared/jira.dto';

import { setupJiraApiKeyApi } from '../services/jira.service';

type SetupJiraApiKeyApiMutationParams = {
  onSuccess: () => void;
};
export const useSetupJiraApiKeyApiMutation = ({
  onSuccess,
}: SetupJiraApiKeyApiMutationParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: SetupApiKeyDto) => {
      return await setupJiraApiKeyApi(payload);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['@@jira', data.sessionId, 'detail'],
      });
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
