import useSWR from "swr";
import { api } from "../api";

export const useGetManufacturer = (config) => {
  const url = "v1/manufacturer";
  const fetcher = async (url, arg) => {
    const response = await api.get(url, arg);

    return response?.data?.manufacturers;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const getManufacturerList = () => {
  return api.get("v1/manufacturer");
};
