import { useMutation } from "react-query";
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
    }
  );

  return mutation;
};
