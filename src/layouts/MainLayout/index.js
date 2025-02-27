import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./../../components/Header/index";
import Footer from "./../../components/Footer/index";
import GoToTop from "../../components/GoToTop";
import { useLoading } from "../../context/loadingContext";
import Backdrop from "../../components/BackDrop";
import DashboardSidebar from "./SideBar.js";

const MainLayout = () => {
  const { isLoading } = useLoading();

  return (
    <div>
      <Backdrop open={isLoading} />
      <main>
        <div className="flex">
          <DashboardSidebar />
          <div className="flex-1">
            <Header />

            <div className="p-2 h-screen">
              <div className="p-5 shadow-lg">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
      <GoToTop />
    </div>
  );
};

export default MainLayout;
