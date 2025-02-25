import { useCallback, useMemo, useRef } from "react";
import {
  isArray,
  isEmpty,
  isEqual,
  isNull,
  isObject,
  mapKeys,
  omit,
} from "lodash";
import { useNavigate, useLocation } from "react-router-dom";
// Chuyển từ useHistory sang useNavigate

export const useQueryState = (initialQuery, { prefix = "" } = {}) => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  // console.log("pathName", pathname);
  // console.log("search", search);
  // console.log("initial query", initialQuery);

  const queryObjRef = useRef();

  const pf = useMemo(
    () => (typeof prefix === "string" ? prefix.trim() : ""),
    [prefix]
  );
  const $page = `${pf}page`;
  const $pageSize = `${pf}limit`;
  const $orderBy = `${pf}orderBy`;
  const $order = `${pf}order`;
  const $filters = `${pf}filters`;
  const $quickFilters = `${pf}quickFilters`;
  const $keyword = `${pf}keyword`;
  const $tab = `${pf}tab`;

  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const jsonParse = (str, fallbackOutput) => {
    if (isJsonString(str)) return JSON.parse(str);
    return fallbackOutput;
  };

  const convertObj = useCallback(
    (obj = {}) => {
      const result = { ...obj };
      const keys = [$filters, $quickFilters, $keyword];

      // console.log("convertObj keys", keys);
      // console.log("convertObj result", result);
      // console.log("convertObj obj", { ...obj });

      keys.forEach((key) => {
        if (isNull(obj[key]) || isEqual(obj[key], {})) {
          result[key] = null;
        } else if (result[key] !== undefined) {
          result[key] = JSON.stringify(obj[key]);
        }
      });

      return result;
    },
    [$filters, $quickFilters, $keyword]
  );

  const queryObj = useMemo(() => {
    let result;

    if (!search && !!initialQuery) {
      // console.log("result before map", result);
      result = mapKeys(initialQuery, (v, k) => `${pf}${k}`);
      // console.log("before convert obj", result);
      result = convertObj(result);
      // console.log("result after convert", result);
    } else {
      const params = new URLSearchParams(search);
      result = Object.fromEntries(params.entries());
    }

    if (!isEqual(result, queryObjRef.current)) {
      queryObjRef.current = result;
    }

    return queryObjRef.current;
  }, [search, initialQuery, queryObjRef.current]);

  const page = useMemo(() => queryObj[$page] || 1, [queryObj, $page]);
  const pageSize = useMemo(
    () => (queryObj[$pageSize] > 0 ? queryObj[$pageSize] : undefined),
    [queryObj, $pageSize]
  );

  const sort = useMemo(
    () =>
      queryObj[$orderBy] && queryObj[$order]
        ? { orderBy: queryObj[$orderBy], order: queryObj[$order] }
        : null,
    [queryObj, $orderBy, $order]
  );

  const filters = useMemo(
    () => jsonParse(queryObj[$filters], {}) || {},
    [queryObj, $filters]
  );
  const quickFilters = useMemo(
    () => jsonParse(queryObj[$quickFilters], {}) || {},
    [queryObj, $quickFilters]
  );
  const keyword = useMemo(
    () => jsonParse(queryObj[$keyword], "") || "",
    [queryObj, $keyword]
  );
  const tab = useMemo(
    () => queryObj[$tab] ?? initialQuery?.tab,
    [queryObj, $tab]
  );

  const currentQuery = useMemo(() => {
    const rest = omit(queryObj, [
      $page,
      $pageSize,
      $order,
      $orderBy,
      $filters,
      $quickFilters,
      $keyword,
      $tab,
    ]);

    return {
      [$page]: page,
      [$pageSize]: pageSize,
      [$order]: sort?.order,
      [$orderBy]: sort?.orderBy,
      [$filters]: filters,
      [$quickFilters]: quickFilters,
      [$keyword]: keyword,
      [$tab]: tab,
      ...rest,
    };
  }, [
    $page,
    $pageSize,
    $order,
    $orderBy,
    $filters,
    $quickFilters,
    $keyword,
    $tab,
    page,
    pageSize,
    sort,
    filters,
    quickFilters,
    keyword,
    tab,
  ]);

  const updateUrl = useCallback(
    (obj = {}) => {
      const combinedObj = {
        ...(!search && !!initialQuery ? initialQuery : {}),
        ...currentQuery,
        ...obj,
      };

      Object.keys(combinedObj).forEach((key) => {
        const value = combinedObj[key];

        if (
          value === undefined ||
          value === null ||
          value === "" ||
          (isArray(value) && value.length === 0) ||
          (isObject(value) && isEmpty(value))
        ) {
          delete combinedObj[key];
        } else if (isObject(value)) {
          Object.keys(value).forEach((nestedKey) => {
            if (
              value[nestedKey] === undefined ||
              value[nestedKey] === null ||
              value[nestedKey] === "" ||
              (isArray(value[nestedKey]) && value[nestedKey].length === 0) ||
              (isObject(value[nestedKey]) && isEmpty(value[nestedKey]))
            ) {
              console.log('nestedKey",', nestedKey);
              delete value[nestedKey];
            }
          });

          if (isEmpty(value)) {
            delete combinedObj[key];
          }
        }
      });
      const convertedObj = convertObj(combinedObj);

      const newSearch = new URLSearchParams(convertedObj).toString();
      navigate(`${pathname}?${newSearch}`);
    },
    [
      pathname,
      search,
      initialQuery,
      currentQuery,
      $keyword,
      $tab,
      $page,
      $pageSize,
      convertObj,
      navigate,
    ]
  );

  const setPage = useCallback(
    (payload) => updateUrl({ [$page]: payload }),
    [updateUrl, $page]
  );
  const setPageSize = useCallback(
    (payload) => updateUrl({ [$pageSize]: payload, [$page]: 1 }),
    [updateUrl, $pageSize, $page]
  );
  const setSort = useCallback(
    (payload) =>
      updateUrl({
        [$orderBy]: payload?.orderBy,
        [$order]: payload?.order,
        [$page]: 1,
      }),
    [updateUrl, $orderBy, $order, $page]
  );
  const setFilters = useCallback(
    (payload) => updateUrl({ [$filters]: payload, [$page]: 1 }),
    [updateUrl, $filters, $page]
  );
  const setQuickFilters = useCallback(
    (payload) => updateUrl({ [$quickFilters]: payload, [$page]: 1 }),
    [updateUrl, $quickFilters, $page]
  );
  const setKeyword = useCallback(
    (payload) => updateUrl({ [$keyword]: payload, [$page]: 1 }),
    [updateUrl, $keyword, $page]
  );
  const setTab = useCallback(
    (payload) => updateUrl({ [$tab]: payload, [$page]: 1 }),
    [updateUrl, $tab, $page]
  );

  const setMultiple = (payload = {}) => {
    const obj = mapKeys(payload, (v, k) => `${pf}${k}`);
    updateUrl({ ...obj, [$page]: 1 });
  };

  const withSearch = useCallback(
    (path = "", { omitPrefixKeys = false, omitSpecificKeys = [] } = {}) => {
      let newSearch = new URLSearchParams(search);
      newSearch.delete("cloneId");

      if (omitPrefixKeys) {
        newSearch.delete($page);
        newSearch.delete($pageSize);
        newSearch.delete($orderBy);
        newSearch.delete($order);
        newSearch.delete($filters);
        newSearch.delete($quickFilters);
        newSearch.delete($keyword);
        newSearch.delete($tab);
      }

      if (isArray(omitSpecificKeys) && omitSpecificKeys?.length) {
        omitSpecificKeys.forEach((key) => newSearch.delete(key));
      }

      const k = newSearch.toString() ? (path.includes("?") ? "&" : "?") : "";

      return `${path}${k}${newSearch.toString()}`;
    },
    [
      search,
      $page,
      $pageSize,
      $orderBy,
      $order,
      $filters,
      $quickFilters,
      $keyword,
      $tab,
    ]
  );

  const selectedRowsDeps = JSON.stringify({
    filters,
    quickFilters,
    keyword,
    tab,
  });

  return {
    page,
    pageSize,
    sort,
    filters,
    quickFilters,
    keyword,
    tab,
    selectedRowsDeps,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    setQuickFilters,
    setKeyword,
    setTab,
    setMultiple,
    withSearch,
  };
};
