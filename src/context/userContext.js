import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utils/localStorage";
import { api } from "../service/api";
import { toast } from "react-toastify";
import { eventEmitter } from "../utils";
import { PATH } from "../constants/path";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    user: null,
    isLoggedIn: getLocalStorageItem("token"),
  });

  const updateUser = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      user: { ...prevUser.user, ...updatedData },
    }));
    setLocalStorageItem("user", { ...user, ...updatedData });
  };

  const login = (data) => {
    setUser({
      user: data?.user,
      isLoggedIn: true,
    });

    setLocalStorageItem("user", data?.user);
    setLocalStorageItem("token", data?.accessToken);
    setLocalStorageItem("refreshToken", data?.refreshToken);
  };

  const logout = (navigate) => {
    setUser({
      user: null,
      isLoggedIn: false,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    toast.info("Bạn đã đăng xuất thành công.");

    if (navigate) {
      navigate(PATH.LOGIN);
    }
  };

  useEffect(() => {
    const handleLogout = () => {
      logout();
    };

    eventEmitter.addListener("logout", handleLogout);

    return () => {
      eventEmitter.removeListener("logout", handleLogout);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getLocalStorageItem("token");
      if (token) {
        const url = `v1/auth/me`;
        const response = await api.get(url);
        setUser({
          user: response?.data || {},
          isLoggedIn: true,
        });
      } else {
        // logout();
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
