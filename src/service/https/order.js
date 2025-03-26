import useSWR from "swr";
import { api } from "../api";
import useSWRMutation from "swr/mutation";

export const useGetOrder = (filters, config) => {
  const url = "v1/order";
  const fetcher = async (url) => {
    return api.get(url, filters);
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useGetOrderDetail = (productId, config) => {
  const url = `v1/order/${productId}`;
  const fetcher = async (url) => {
    const response = await api.get(url);
    return response.data;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useChangeOrderStatus = (orderId, config) => {
  const url = "v1/order/change-status/:orderId";
  const fetcher = (url, { arg }) => {
    console.log("arg", arg);
    return api.put(url.replace(":orderId", orderId), arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};
