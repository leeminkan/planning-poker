import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { getSessionState } from "../services/session.service";
import { SessionStateInterface } from "~/shared/session-state.interface";

type SessionStateMutationParams = {
  onSuccess: (data: SessionStateInterface) => void;
};
export const useSessionStateMutation = ({
  onSuccess,
}: SessionStateMutationParams) => {
  const mutation = useMutation(
    async (sessionId: string) => {
      return await getSessionState({ id: sessionId });
    },
    {
      onSuccess: onSuccess,
      onError: (error: AxiosError) => {
        if (error.status === 404) {
          toast.error("Session ID not found!");
        }
      },
    }
  );

  return mutation;
};
