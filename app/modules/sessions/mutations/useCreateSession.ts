import { useMutation } from 'react-query';

import { SessionStateInterface } from '~/shared/session-state.interface';

import { createSessionState } from '../services/session.service';

type StartNewSessionMutationParams = {
  onSuccess: (data: SessionStateInterface) => void;
};
export const useStartNewSessionMutation = ({
  onSuccess,
}: StartNewSessionMutationParams) => {
  const mutation = useMutation(createSessionState, {
    onSuccess: onSuccess,
  });

  return mutation;
};
