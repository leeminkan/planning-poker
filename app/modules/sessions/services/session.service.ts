import { axiosInstance } from "~/axios";
import { GetSessionStateResponse, CreateSessionStateResponse } from "./types";

export const getSessionState = async ({ id }: { id: string }) => {
  const res = await axiosInstance.get<GetSessionStateResponse>(
    `/api/sessions/${id}`
  );
  return res.data.data;
};

export const createSessionState = async () => {
  const res = await axiosInstance.post<CreateSessionStateResponse>(
    `/api/sessions`
  );
  return res.data.data;
};
