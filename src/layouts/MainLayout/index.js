import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./../../components/Header/index";
import Footer from "./../../components/Footer/index";
import GoToTop from "../../components/GoToTop";
import { useLoading } from "../../context/loadingContext";
import Backdrop from "../../components/BackDrop";

const MainLayout = () => {
  const { isLoading } = useLoading();

  return (
    <div>
      <Header />
      <Backdrop open={isLoading} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <GoToTop />
    </div>
  );
};

export default MainLayout;
