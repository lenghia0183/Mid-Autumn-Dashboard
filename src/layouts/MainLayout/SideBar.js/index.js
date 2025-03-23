import React, { useState } from "react";
import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";
import Image from "../../../components/Image";
import Icon from "../../../components/Icon";
import IconButton from "../../../components/IconButton";
import { PATH } from "../../../constants/path";
import images from "../../../asset/images";

const navItems = [
  { path: PATH.DASHBOARD, icon: "key", label: "Thống kê" },
  {
    path: PATH.ORDER_LIST,
    icon: "cart",
    label: "Danh sách đơn hàng",
  },
  { path: PATH.USER_LIST, icon: "user", label: "Danh sách người dùng" },
  { path: PATH.PRODUCT_LIST, icon: "order", label: "Danh sách sản phẩm" },
  { path: PATH.CATEGORY_LIST, icon: "eye", label: "Danh sách danh mục" },
  {
    path: PATH.MANUFACTURER_LIST,
    icon: "cart",
    label: "Danh sách thương hiệu",
  },
];

const DashboardSidebar = ({ className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  const sidebarWidth = isExpanded ? "w-[320px]" : "w-[150px]";

  return (
    <aside
      className={clsx(
        "h-screen p-4 flex flex-col text-white-200 transition-all duration-700 overflow-hidden ",
        sidebarWidth,
        className
      )}
      style={{
        background: "linear-gradient(40deg,#000000 15%, #292929 90%)",
      }}
    >
      {/* Sidebar Header */}
      <header className="mb-8 border-b border-gray-200 pb-4 flex justify-between items-center">
        <Link to={PATH.DASHBOARD} className="flex items-center gap-3">
          <Image
            src={images.logo}
            alt="Dashboard Logo"
            width="w-[70px]"
            height="h-[70px]"
            className="flex-shrink-0"
          />
          <span
            className={clsx(
              "text-2xl font-bold transition-all overflow-hidden whitespace-nowrap duration-700",
              { "w-60": isExpanded, "w-0": !isExpanded }
            )}
          >
            Mid Autumn
          </span>
        </Link>
        <IconButton
          iconName="arrowDown"
          iconColor="white-200"
          onClick={toggleSidebar}
          className={clsx("rotate-90 transition-all duration-700", {
            "!-rotate-90": !isExpanded,
          })}
          iconSize={1.3}
        />
      </header>

      {/* Sidebar Navigation */}
      <nav className="flex-1">
        <ul className="space-y-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className="flex items-center justify-center p-2 rounded hover:bg-gray-700"
              >
                <Icon name={item.icon} size="1.5em" className="mr-2" />
                <span
                  className={clsx(
                    "whitespace-nowrap overflow-hidden transition-all duration-700",
                    { "w-60": isExpanded, "w-0": !isExpanded }
                  )}
                >
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <footer className="mt-8 text-center text-sm transition-all duration-700 text-balance">
        <p>&copy; {new Date().getFullYear()} By Lenghia0183</p>
      </footer>
    </aside>
  );
};

export default DashboardSidebar;
