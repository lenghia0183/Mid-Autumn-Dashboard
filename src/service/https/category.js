import useSWR from "swr";
import { api } from "../api";
import useSWRMutation from "swr/mutation";

export const useGetCategory = (filter, config) => {
  const url = "v1/category";
  const fetcher = async (url) => {
    const response = await api.get(url, filter);

    return response;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useDeleteCategory = (config) => {
  const fetcher = async (url, { arg }) => {
    return api.delete(`${url}/${arg?._id}`);
  };

  const url = "v1/category";
  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useGetCategoryDetail = (categoryId, config) => {
  const url = `v1/category/${categoryId}`;
  const fetcher = async (url) => {
    const response = await api.get(url);
    return response.data;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useUpdateCategory = (config) => {
  const url = `v1/category`;

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

export const getCategoryList = () => {
  return api.get("v1/category");
};
