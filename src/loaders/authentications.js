import { redirect } from "react-router-dom";
import { PATH } from "../constants/path";

const checkAuth = () => {
  const user = localStorage.getItem("user");
  return user ? true : false;
};

export const checkNotLoggedIn = () => {
  if (!checkAuth()) {
    return redirect(PATH.LOGIN);
  }
  return null;
};

export const checkLoggedIn = () => {
  if (checkAuth()) {
    return redirect(PATH.HOME);
  }
  return null;
};
