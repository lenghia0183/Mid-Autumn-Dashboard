import useSWR from "swr";
import { api } from "../api";

export const useGetRevenueProfit = (filters, config) => {
  const url = "v1/statistic/revenue";
  const fetcher = async (url) => {
    return api.get(url, filters);
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useGetProductDistribution = (filters, config) => {
  const url = "v1/statistic/product-distribution";
  const fetcher = async (url) => {
    return api.get(url, filters);
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useGetBrandMarketShare = (filters, config) => {
  const url = "v1/statistic/brand-market-share";
  const fetcher = async (url) => {
    return api.get(url, filters);
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useGetOrderByRegion = (filters, config) => {
  const url = "v1/statistic/order-by-region";
  const fetcher = async (url) => {
    return api.get(url, filters);
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};
