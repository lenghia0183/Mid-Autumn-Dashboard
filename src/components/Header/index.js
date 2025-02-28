import React, { useState, useEffect } from "react";
import Button from "./../Button/index";
import { useUser } from "../../context/userContext";
import { PATH } from "../../constants/path";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  const { user: userData, logout } = useUser();

  const { t } = useTranslation();

  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const timeString = currentTime.toLocaleTimeString();
  const dateString = currentTime.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      className="flex justify-between items-center p-4 bg-white-400 text-white shadow-lg"
      style={{
        background: "linear-gradient(30deg,#000000 -70%, #292929 60%)",
      }}
    >
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{timeString}</span>
        <span className="text-sm">{dateString}</span>
      </div>

      <div className="flex items-center gap-4">
        {userData?.isLoggedIn ? (
          <>
            <span className="text-lg">
              {t("common.hello")} <span>{userData?.user?.fullname}</span>
            </span>
            <img
              src={userData?.user?.avatar}
              alt={userData?.user?.fullname}
              className="w-10 h-10 rounded-full object-cover"
            />
            <Button
              onClick={() => {
                logout(navigate);
              }}
              variant="outlined"
              borderColor="crimson"
              textColor="crimson"
              bgHoverColor="crimson-200"
            >
              {t("common.logout")}
            </Button>
          </>
        ) : (
          <Button to={PATH.LOGIN} variant="outlined">
            {t("common.login")}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
