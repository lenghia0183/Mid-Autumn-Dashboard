import useSWRMutation from "swr/mutation";
import { api } from "../api";
import useSWR from "swr";

export const useAddUser = (config) => {
  const url = `v1/user`;

  const fetcher = (url, { arg }) => {
    const formData = new FormData();

    Object.entries(arg).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value)) {
        value.forEach((file) => formData.append("images", file));
      } else {
        formData.append(
          key,
          value instanceof File ? value : JSON.stringify(value)
        );
      }
    });

    return api.postMultiplePart(url, formData);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

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

export const useGetUserDetail = (userId, config) => {
  const url = `v1/user/${userId}`;
  const fetcher = async (url) => {
    const response = await api.get(url);
    return response.data;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useDeleteUser = (config) => {
  const fetcher = async (url, { arg }) => {
    return api.delete(`${url}/${arg?._id}`);
  };

  const url = "v1/user";
  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useUpdateUser = (config) => {
  const url = `v1/user`;

  const fetcher = (url, { arg }) => {
    const formData = new FormData();

    Object.entries(arg.body).forEach(([key, value]) =>
      formData.append(
        key,
        value instanceof File ? value : JSON.stringify(value)
      )
    );

    return api.putMultiplePart(`${url}/${arg?._id}`, formData);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};
