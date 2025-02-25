import useSWRMutation from "swr/mutation";
import { api } from "../api";

export const useAddOrder = (config) => {
  const url = "v1/order";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};
