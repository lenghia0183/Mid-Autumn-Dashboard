import { useLoading } from "../context/loadingContext";

const loadingMiddleware =
  (useSWRNext) =>
  (key, fetcher, config = {}) => {
    const { setLoading } = useLoading();

    const finalConfig = { shouldShowLoading: true, ...config };

    const extendedFetcher = async (...args) => {
      if (finalConfig.shouldShowLoading) setLoading(true);
      try {
        return await fetcher(...args);
      } finally {
        if (finalConfig.shouldShowLoading) setLoading(false);
      }
    };

    return useSWRNext(key, extendedFetcher, finalConfig);
  };

export default loadingMiddleware;
