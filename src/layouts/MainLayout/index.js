// MainLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./../../components/Header/index";
import GoToTop from "./../../components/GoToTop/index";
import Backdrop from "./../../components/BackDrop/index";
import DashboardSidebar from "./SideBar";

const MainLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const sidebarWidth = isExpanded ? 320 : 150;

  return (
    <div className="min-h-screen">
      <Backdrop open={false} />

      {/* Sidebar cố định */}
      <div className="fixed top-0 left-0 h-screen z-40">
        <DashboardSidebar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </div>

      {/* Nội dung chính */}
      <main
        className="transition-all duration-500"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <Header />
        <div className="p-4">
          <div className="shadow-lg bg-white rounded-xl p-4">
            <Outlet />
          </div>
        </div>
      </main>

      <GoToTop />
    </div>
  );
};

export default MainLayout;
