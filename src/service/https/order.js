import useSWR from "swr";
import { api } from "../api";

export const useGetOrder = (filters, config) => {
  const url = "v1/order";
  const fetcher = async (url) => {
    return api.get(url, filters);
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};
