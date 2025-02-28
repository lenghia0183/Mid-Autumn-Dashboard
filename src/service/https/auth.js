import { api } from "../api";
import useSWRMutation from "swr/mutation";

export const useLogin = (config) => {
  const url = "v1/auth/login";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};
