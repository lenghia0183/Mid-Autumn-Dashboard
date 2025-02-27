import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { PAGE_TITLE, PATH } from "../../constants/path";
import { useLocation } from "react-router-dom";
import styles from "./AuthLayout.module.scss";
import clsx from "clsx";
import { Outlet } from "react-router-dom";

import images from "../../asset/images";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GoToTop from "../../components/GoToTop";
import { useLoading } from "../../context/loadingContext";
import Backdrop from "../../components/BackDrop";

function AuthLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { isLoading } = useLoading();

  const breadcrumbData = {
    [PATH.LOGIN]: [
      { label: PAGE_TITLE.HOME, to: PATH.HOME },
      { label: PAGE_TITLE.LOGIN, to: PATH.LOGIN },
    ],
    [PATH.SIGN_UP]: [
      { label: PAGE_TITLE.HOME, to: PATH.HOME },
      { label: PAGE_TITLE.SIGN_UP, to: PATH.SIGN_UP },
    ],
    [PATH.FORGOT_PASSWORD]: [
      { label: PAGE_TITLE.HOME, to: PATH.HOME },
      { label: PAGE_TITLE.FORGOT_PASSWORD, to: PATH.FORGOT_PASSWORD },
    ],
    [PATH.VERIFY_FORGOT_OTP]: [
      { label: PAGE_TITLE.HOME, to: PATH.HOME },
      { label: PAGE_TITLE.FORGOT_PASSWORD, to: PATH.FORGOT_PASSWORD },
      { label: PAGE_TITLE.VERIFY_FORGOT_OTP, to: PATH.VERIFY_FORGOT_OTP },
    ],
    [PATH.RESET_PASSWORD]: [
      { label: PAGE_TITLE.HOME, to: PATH.HOME },
      { label: PAGE_TITLE.FORGOT_PASSWORD, to: PATH.FORGOT_PASSWORD },
      { label: PAGE_TITLE.RESET_PASSWORD, to: PATH.RESET_PASSWORD },
    ],
  };

  const breadcrumbAuthLayout = breadcrumbData[currentPath] || [];

  return (
    <>
      <Header />
      <Backdrop open={isLoading} />
      <Breadcrumb items={breadcrumbAuthLayout} />

      <div className="container xl:flex items-center xl:mt-14 mt-6 xl:space-x-7 space-y-6">
        <div
          className={clsx(
            "flex-1 aspect-[5/4] hidden sm:block",
            styles["flip-box-container"]
          )}
        >
          <div className={styles["flip-box-inner"]}>
            <div
              className={clsx("relative", styles["flip-box-front"])}
              style={{
                backgroundImage: `url(${images.homeReason})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div
              className={styles["flip-box-back"]}
              style={{
                backgroundImage: `url(${images.home1})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>

      <Footer />
      <GoToTop />
    </>
  );
}

export default AuthLayout;
