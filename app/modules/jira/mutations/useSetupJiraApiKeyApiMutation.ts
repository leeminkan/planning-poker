import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { SetupApiKeyDto } from '~/shared/jira.dto';

import { setupJiraApiKeyApi } from '../services/jira.service';

type SetupJiraApiKeyApiMutationParams = {
  onSuccess: () => void;
};
export const useSetupJiraApiKeyApiMutation = ({
  onSuccess,
}: SetupJiraApiKeyApiMutationParams) => {
  const mutation = useMutation({
    mutationFn: async (payload: SetupApiKeyDto) => {
      return await setupJiraApiKeyApi(payload);
    },
    onSuccess: () => {
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
