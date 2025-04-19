import useSWR from "swr";
import { api } from "../api";
import useSWRMutation from "swr/mutation";

export const useGetContactList = (filter, config) => {
  const url = "v1/category";
  const fetcher = async (url) => {
    const response = await api.get(url, filter);

    return response;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useGetContactDetail = (categoryId, config) => {
  const url = `v1/category/${categoryId}`;
  const fetcher = async (url) => {
    const response = await api.get(url);
    return response.data;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useDeleteContact = (config) => {
  const fetcher = async (url, { arg }) => {
    return api.delete(`${url}/${arg?._id}`);
  };

  const url = "v1/category";
  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};
