import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { eventEmitter } from "../../utils";
import { PATH } from "../../constants/path";

const LogoutListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      console.log("🔴 Đã logout! Chuyển hướng...");
      // navigate(PATH.LOGIN);
    };

    eventEmitter.addListener("logout", () => {
      console.log("test");
    });

    return () => {
      eventEmitter.removeListener("logout", handleLogout);
    };
  }, []);

  return <div>haha</div>;
};

export default LogoutListener;
