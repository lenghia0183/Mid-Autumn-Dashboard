import axios from "axios";
import { validateStatus } from "../../utils/api";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { CONFIG_COOKIES } from "../../constants";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../utils/localStorage";

import { triggerLogout } from "../../utils/eventEmitter";

const cookies = new Cookies();
const BASE_URL = process.env.REACT_APP_BASE_URL + "/api/";
const BASE_URL_GHN = process.env.REACT_APP_BASE_URL_GHN;
const TOKEN_GHN = process.env.REACT_APP_GHN_API_KEY;
const SHOP_ID_GHN = process.env.REACT_APP_GHN_SHOP_ID;

const HEADERS_MULTIPLE_PART = {
  "Content-Type": "multipart/form-data; boundary=something",
};

const REFRESH_TOKEN_URL = "v1/auth/refresh-token";

export const createInstance = (baseURL, customHeaders = {}) => {
  console.log("customHeaders: ", customHeaders);

  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      contentType: "application/json",
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ...customHeaders,
    },
  });

  // Add a request interceptor
  instance.interceptors.request.use(
    (config) => {
      const token = getLocalStorageItem("token"); // Lấy token từ localStorage

      if (config.url !== REFRESH_TOKEN_URL && token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      toast.error("Đã xảy ra lỗi trong quá trình yêu cầu.");
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      // Xử lý nếu thành công
      if (validateStatus(response?.status)) {
        if (response?.config?.getHeaders) {
          return { data: response?.data, header: response?.headers };
        }
        return response.data;
      } else if (response.status === 500) {
        toast.error("Đã xảy ra lỗi không xác định, vui lòng thử lại sau.");
      } else {
        toast.info("Bạn không có quyền truy cập.");
      }
    },
    async (error) => {
      const response = error.response;
      const originalRequest = error.config;

      if (
        response?.status === 401 &&
        !originalRequest._isRefreshBefore &&
        originalRequest.url !== REFRESH_TOKEN_URL &&
        localStorage.getItem("refreshToken")
      ) {
        originalRequest._isRefreshBefore = true;
        try {
          const refresh = await refreshAccessToken();
          if (refresh.code === 200) {
            const newAccessToken = refresh.data.accessToken;

            setLocalStorageItem("token", newAccessToken);
            cookies.set("token", newAccessToken, CONFIG_COOKIES);
            cookies.set("refreshToken", newAccessToken, CONFIG_COOKIES);

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return api.instance(originalRequest);
          } else {
            triggerLogout();
          }
        } catch (err) {
          triggerLogout();
        }
      } else if (
        (response?.status === 401 &&
          response.config.baseURL !== BASE_URL_GHN &&
          response.data.message === "Invalid token") ||
        response.data.message === "Token không hợp lệ."
      ) {
        triggerLogout();
      } else {
        return Promise.reject(error);
      }
    }
  );

  return instance;
};

export const createApi = (instance) => ({
  instance,

  post: (endpoint, params) => {
    return instance
      .post(endpoint, params)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err?.response?.data || err;
      });
  },

  postMultiplePart: (endpoint, body) => {
    return instance
      .post(endpoint, body, {
        headers: HEADERS_MULTIPLE_PART,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err?.response?.data || err;
      });
  },

  get: (endpoint, params = {}, options = {}) => {
    return instance
      .get(endpoint, { ...options, params })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err?.response?.data || err;
      });
  },

  put: (endpoint, params) => {
    return instance
      .put(endpoint, params)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err?.response?.data || err;
      });
  },

  putMultiplePart: (endpoint, body) => {
    return instance
      .put(endpoint, body, {
        headers: HEADERS_MULTIPLE_PART,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err?.response?.data || err;
      });
  },

  patch: (endpoint, params) => {
    return instance
      .patch(endpoint, params)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err?.response?.data || err;
      });
  },

  delete: (endpoint, params) => {
    return instance
      .delete(endpoint, {
        data: params,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err?.response?.data || err;
      });
  },
});

// Dùng chính api để gọi refresh token
export const refreshAccessToken = () => {
  const refreshToken = getLocalStorageItem("refreshToken");
  return api.instance.post(REFRESH_TOKEN_URL, {
    refreshToken: refreshToken,
  });
};

const instance = createInstance(BASE_URL);

const instanceGhn = createInstance(BASE_URL_GHN, {
  Token: TOKEN_GHN,
  ShopId: SHOP_ID_GHN,
});

const api = createApi(instance);
const ghnApi = createApi(instanceGhn);

export { api, ghnApi };
