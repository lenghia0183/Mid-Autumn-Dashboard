import { api } from "../api";
import useSWRMutation from "swr/mutation";

export const useLogin = (config) => {
  const url = "v1/auth/login";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useRegister = (config) => {
  const url = "v1/auth/register";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useSocialLogin = (config) => {
  const url = "v1/auth/social-login";
  const fetcher = (url, { arg }) => {
    return api.post(url, { idToken: arg });
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useChangePassword = (config) => {
  const url = "v1/auth/change-password";
  const fetcher = (url, { arg }) => {
    return api.put(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useForgotPassword = (config) => {
  const url = "v1/auth/forgot-password";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };

  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useVerifyForgotOTP = (config) => {
  const url = "v1/auth/verify-forgot-password-otp";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };
  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};

export const useResetPassword = (config) => {
  const url = "v1/auth/reset-password";
  const fetcher = (url, { arg }) => {
    return api.post(url, arg);
  };
  return useSWRMutation(url, fetcher, { shouldShowLoading: true, ...config });
};
