import useSWR from "swr";
import { api } from "../api";
import { sleep } from "./../../utils/sleep";
import useSWRMutation from "swr/mutation";

export const useAddProduct = (config) => {
  const url = `v1/product`;

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

export const useUpdateProduct = (config) => {
  const url = `v1/product`;

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

export const useDeleteProduct = (config) => {
  const fetcher = async (url, { arg }) => {
    return api.delete(`${url}/${arg?._id}`);
  };

  const url = "v1/product";
  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useGetProduct = (filters, config) => {
  const url = "v1/product";
  const fetcher = async (url) => {
    return api.get(url, filters);
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useGetProductDetail = (productId, config) => {
  const url = `v1/product/${productId}`;
  const fetcher = async (url) => {
    const response = await api.get(url);
    return response.data;
  };

  return useSWR(url, fetcher, { shouldShowLoading: false, ...config });
};

export const useGenerateProductDescription = (config) => {
  const url = "v1/ai/product-description";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useTranslateProduct = (config) => {
  const url = "v1/ai/translate-product";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const getProductList = () => {
  return api.get("v1/product", { limit: 100 });
};
