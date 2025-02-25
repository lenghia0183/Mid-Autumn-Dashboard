import { useCallback } from "react";
import i18n from "i18next";
import Cookies from "js-cookie";

const useChangeLanguage = () => {
  const changeLanguage = useCallback((lang) => {
    i18n.changeLanguage(lang);
    Cookies.set("lang", lang);
    localStorage.setItem("lang", lang);
    window.location.reload();
  }, []);

  return changeLanguage;
};

export default useChangeLanguage;
