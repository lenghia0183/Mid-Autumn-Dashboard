import useSWR from "swr";
import { api } from "../api";
import useSWRMutation from "swr/mutation";

export const useGetManufacturer = (filter, config) => {
  const url = "v1/manufacturer";
  const fetcher = async (url) => {
    const response = await api.get(url, filter);

    return response;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useDeleteManufacturer = (config) => {
  const fetcher = async (url, { arg }) => {
    return api.delete(`${url}/${arg?._id}`);
  };

  const url = "v1/manufacturer";
  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const getManufacturerList = () => {
  return api.get("v1/manufacturer");
};
