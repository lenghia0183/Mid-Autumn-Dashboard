import useSWRMutation from "swr/mutation";
import { api } from "../api";
import useSWR from "swr";

export const useUpdateMe = (config) => {
  const url = `v1/auth/me`;

  const fetcher = (url, { arg }) => {
    const formData = new FormData();

    Object.entries(arg).forEach(([key, value]) =>
      formData.append(
        key,
        value instanceof File ? value : JSON.stringify(value)
      )
    );

    return api.putMultiplePart(url, formData);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useGetMe = (config) => {
  const url = `v1/auth/me`;
  const fetcher = async (url) => {
    const response = await api.get(url);
    return response.data;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useGetUser = (filter, config) => {
  const url = "v1/user";
  const fetcher = async (url) => {
    const response = await api.get(url, filter);

    return response;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};
