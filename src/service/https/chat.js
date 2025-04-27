import useSWR from "swr";
import { api } from "../api";

export const useGetAdminChat = (filters, config) => {
  const url = `v1/chat`;
  const fetcher = async (url) => {
    const response = await api.get(url, filters);
    return response;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useGetChatById = (productId, config) => {
  const url = `v1/chat/${productId}`;
  const fetcher = async (url) => {
    const response = await api.get(url);
    return response.data;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useGetMyChat = (config) => {
  const url = `v1/chat/my`;
  const fetcher = async (url) => {
    const response = await api.get(url);
    return response;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};
