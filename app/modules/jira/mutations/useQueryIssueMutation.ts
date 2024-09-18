import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import { QueryIssueDto } from '~/shared/jira.dto';
import { JiraIssue } from '~/shared/jira.interface';

import { getJiraIssueApi } from '../services/jira.service';

type QueryIssueMutationParams = {
  onSuccess: (data: JiraIssue[]) => void;
};
export const useQueryIssueMutation = ({
  onSuccess,
}: QueryIssueMutationParams) => {
  const mutation = useMutation({
    mutationFn: async (payload: QueryIssueDto) => {
      return await getJiraIssueApi(payload);
    },
    onSuccess: (data) => {
      toast.info('Query successfully!');
      onSuccess(data);
    },
    onError: (error: AxiosError) => {
      console.error(error);
      toast.error('Some thing was wrong!');
    },
  });

  return mutation;
};
