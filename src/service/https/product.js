import useSWR from "swr";
import { api } from "../api";
import { sleep } from "./../../utils/sleep";

export const useGetProduct = (filters, config) => {
  const url = "v1/product";
  const fetcher = async (url) => {
    await sleep(3000);
    return api.get(url, filters);
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useGetProductDetail = (productId, config) => {
  const url = `v1/product/${productId}`;
  const fetcher = async (url) => {
    const response = await api.get(url);
    return response.data;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};
