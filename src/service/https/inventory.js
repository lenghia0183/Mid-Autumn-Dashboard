import useSWR from "swr";
import { api } from "../api";
import useSWRMutation from "swr/mutation";

export const useGetInventoryHistory = (filters, config) => {
  const url = "v1/inventory/history";
  const fetcher = async (url) => {
    return api.get(url, filters);
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useAddProductIntoInventory = (config) => {
  const url = "v1/inventory/add";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useGetInventoryDetail = (inventoryId, config) => {
  const url = `v1/inventory/${inventoryId}`;
  const fetcher = async (url) => {
    return api.get(url);
  };

  return useSWR(inventoryId ? url : null, fetcher, {
    shouldShowLoading: false,
    ...config,
  });
};
