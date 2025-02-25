import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import Image from "../Image";
import images from "../../asset/images";
import Button from "./../Button";
import useColorClasses from "../../hooks/useColorClasses";
import { PAGE_TITLE, PATH } from "../../constants/path";
import Icon from "../Icon";
import IconButton from "./../IconButton/index";
import DrawerMenu from "./../DrawerMenu/index";
import Divider from "../Devider";
import { useTranslation } from "react-i18next";
import useChangeLanguage from "../../hooks/useChangeLanguage";
import useBreakpoint from "./../../hooks/useBreakpoint";
import formatCurrency from "../../utils/formatCurrency";
import { useCart, useUser } from "../../context";
import { validateStatus } from "../../utils/api";
import { toast } from "react-toastify";

const Header = ({ bgColor = "emerald", textColor = "white", className }) => {
  const containerRef = useRef();
  const [padding, setPadding] = useState({});
  const isLargerThanSm = useBreakpoint("sm");

  const { user, logout } = useUser();

  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { textColor: newTextColor } = useColorClasses({ textColor });
  const [isOpenCartDrawer, setIsOpenCartDrawer] = useState(false);
  const [isOpenNavDrawer, setIsOpenNavDrawer] = useState(false);

  const { cartData, deleteCartDetail } = useCart();

  const myCart = cartData || [];

  const { pathname } = useLocation();

  const handleOpenNavDrawer = () => {
    setIsOpenNavDrawer(true);
  };

  const handleCloseNavDrawer = () => {
    setIsOpenNavDrawer(false);
  };

  const handleOpenCartDrawer = () => {
    setIsOpenCartDrawer(true);
  };

  const handleCloseCartDrawer = () => {
    setIsOpenCartDrawer(false);
  };

  useEffect(() => {
    if (containerRef.current) {
      const computedStyle = getComputedStyle(containerRef.current);
      setPadding({
        top: computedStyle.paddingTop,
        right: computedStyle.paddingRight,
        bottom: computedStyle.paddingBottom,
        left: computedStyle.paddingLeft,
      });
    }
  }, []);

  const { t } = useTranslation();
  const changeLanguage = useChangeLanguage();

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
  };

  const navItems = [
    { label: PAGE_TITLE.HOME, path: PATH.HOME, isArrow: false },
    { label: PAGE_TITLE.ABOUT, path: PATH.ABOUT, isArrow: false },
    { label: PAGE_TITLE.PRODUCT, path: PATH.PRODUCTS, isArrow: false },
    // { label: PAGE_TITLE.OTHER, path: PATH.OTHER, isArrow: false },
    { label: PAGE_TITLE.CONTACT, path: PATH.CONTACT, isArrow: false },
  ];

  const renderTitleCartDrawer = () => {
    return (
      <div className="flex items-center justify-between w-full py-3 border-b border-gray-300">
        <h4 className="text-dark text-2xl font-semibold">{t("cart.title")}</h4>
        <IconButton
          iconName="close"
          textColor="dark"
          onClick={handleCloseCartDrawer}
        />
      </div>
    );
  };

  const renderTitleNavDrawer = () => {
    return (
      <div className="flex items-center justify-between w-full mt-2">
        <h4 className="text-white text-2xl font-semibold">
          {t("common.midAutumnFestival")}
        </h4>
        <IconButton
          iconName="close"
          textColor="white"
          onClick={handleCloseNavDrawer}
        />
      </div>
    );
  };

  const renderContentCartDrawer = () => {
    return (
      <div className="p-4 pt-0">
        <div className="text-dark">
          {myCart?.cartDetails?.length > 0 ? (
            <div>
              {myCart?.cartDetails.map((cart) => {
                return (
                  <div className="flex items-center gap-2 p-3 border-t border-b border-dashed border-gray-300">
                    <Image
                      src={cart?.productId?.images[0]}
                      width="100px"
                      height="100px"
                      className="border border-gray-300 rounded-md"
                    />
                    <div>
                      <p className="text-lg font-medium line-clamp-2">
                        {cart?.productId?.name}
                      </p>
                      <p>
                        {cart?.quantity} X{" "}
                        <span className="font-medium">
                          {formatCurrency(cart?.productId?.price)}
                        </span>
                      </p>
                    </div>
                    <IconButton
                      iconName="bin"
                      textColor="dark-500"
                      iconSize="1.5"
                      onClick={() => {
                        deleteCartDetail(
                          { cartDetailId: cart?._id, cartId: myCart.id },
                          {
                            onSuccess: (response) => {
                              if (validateStatus(response.code)) {
                                toast.success(response.message);
                                // refreshGetMyCart();
                              } else {
                                toast.error(response?.message);
                              }
                            },
                            onError: (error) => {
                              toast.error(
                                "Xóa sản phẩm khỏi giỏ hàng thất bại vui lòng thử lại"
                              );
                            },
                          }
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-dark-800 text-xl font-medium">
              {t("cart.empty")}
            </p>
          )}
        </div>

        <div className="flex justify-between border-b py-4 border-gray-300 mb-5 mt-5">
          <div className="text-dark text-xl font-medium ">
            {t("cart.total")}
          </div>
          <div className="text-crimson text-xl font-medium">
            {formatCurrency(myCart?.cartTotalMoney)}
          </div>
        </div>

        <Button
          full
          bgColor="crimson"
          bgHoverColor="crimson-hover"
          textColor="white"
          className="text-xl font-medium"
          to={PATH.CART}
        >
          {t("cart.cartBtn")}
        </Button>

        <Button
          full
          bgColor="yellow"
          bgHoverColor="yellow-hover"
          className="mt-3 text-xl font-medium"
          to={PATH.CHECKOUT}
          textColor="white"
        >
          {t("cart.checkoutBtn")}
        </Button>
      </div>
    );
  };

  const renderContentNavBarDrawer = () => {
    return (
      <div className="p-4 pt-0">
        <Divider className="mt-2" />
        <nav className="flex flex-col text-base font-semibold">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "flex items-center py-3 hover:text-yellow group duration-500 border-b border-white",
                  isActive && "text-yellow"
                )
              }
            >
              {t(item.label)}
              {item?.isArrow && (
                <Icon
                  name="arrowDown"
                  size="0.6em"
                  strokeWidth={5}
                  className="transition-transform transform group-hover:rotate-180 ml-1"
                />
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex gap-3 mt-3">
          <IconButton
            className="sm:hidden flex"
            iconName="vietnamFlag"
            width="35px"
            height="30px"
            onClick={() => handleLanguageChange("vi")}
          />
          <IconButton
            className="sm:hidden flex"
            iconName="chinaFlag"
            width="35px"
            height="30px"
            onClick={() => handleLanguageChange("zh")}
          />
          <IconButton
            className="sm:hidden flex"
            iconName="japanFlag"
            width="35px"
            height="30px"
            onClick={() => handleLanguageChange("jp")}
          />
          <IconButton
            className="sm:hidden flex"
            iconName="englandFlag"
            width="35px"
            height="30px"
            onClick={() => handleLanguageChange("en")}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <header
        className={clsx(
          `top-0 z-[99999] w-full h-[110px] shadow-lg`,
          newBgColor,
          newTextColor,
          className
        )}
      >
        <div ref={containerRef} className="container relative h-full text-base">
          {/* Navigation Menu */}
          <nav
            className="absolute top-1/2 -translate-y-1/2 space-x-4 text-base font-semibold xl:flex hidden"
            style={{
              left: padding.left,
            }}
          >
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center hover:text-yellow group duration-500",
                    isActive && "text-yellow"
                  )
                }
              >
                {t(item.label)}
                {item?.isArrow && (
                  <Icon
                    name="arrowDown"
                    size="0.6em"
                    strokeWidth={5}
                    className="transition-transform transform group-hover:rotate-180 ml-1"
                  />
                )}
              </NavLink>
            ))}
          </nav>

          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 xl:hidden"
            style={{
              left: padding.left,
            }}
          >
            <IconButton
              iconName="menu"
              textColor="white"
              width="30px"
              height="30px"
              textHoverColor="yellow"
              onClick={() => {
                setIsOpenNavDrawer(true);
              }}
            />
          </div>

          {/* Logo Section */}
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <Button to={PATH.HOME} className="hover:scale-110">
              <Image
                src={images.logo}
                width="xl:w-[85px] 55px"
                height="xl:h-[85px] 55px"
              />
            </Button>
          </div>

          <div
            className="flex items-center absolute right-0 top-1/2 -translate-y-1/2 sm:space-x-2"
            style={{
              right: padding.right,
            }}
          >
            {/* Contact Number */}
            <Button
              href="tel:0966859061"
              className=" hover:text-yellow font-sourceSansPro font-semibold text-xl xl:flex hidden"
              textColor="white"
              startIcon={<Icon name="phone" size="1.5em" />}
            >
              {t("shopInfo.phoneNumber")}
            </Button>

            {/* Search Button */}
            <IconButton
              className="sm:flex hidden"
              iconName="search"
              textColor="white"
              iconSize="1.8"
              textHoverColor="yellow"
            />

            {/* Profile Button */}
            {user?.isLoggedIn ? (
              <>
                <IconButton
                  iconName="user"
                  textColor={
                    pathname?.includes(PATH.PROFILE) ? "yellow" : "white"
                  }
                  iconSize="1.5"
                  textHoverColor="yellow"
                  to={PATH.PROFILE_EDIT}
                />

                {/* Cart Button */}
                <div className="relative flex items-center sm:ml-0 ml-2">
                  <div
                    className={clsx(
                      "absolute top-0 right-0 -translate-y-[30%] translate-x-[35%] w-[20px] h-[20px] flex items-center justify-center bg-yellow text-dark rounded-full",
                      {
                        hidden:
                          myCart?.cartDetails?.length === 0 ||
                          myCart?.length === 0,
                      }
                    )}
                  >
                    {myCart?.cartDetails?.length}
                  </div>
                  <IconButton
                    iconName="bag"
                    textColor="white"
                    iconSize="1.8"
                    textHoverColor="yellow"
                    onClick={handleOpenCartDrawer}
                  />
                </div>
              </>
            ) : (
              <>
                <IconButton
                  className=""
                  iconName="login"
                  textColor={pathname === PATH.LOGIN ? "yellow" : "white"}
                  iconSize={isLargerThanSm ? "1.5" : "2"}
                  to={PATH.LOGIN}
                  textHoverColor="yellow"
                />

                <IconButton
                  className="sm:flex hidden"
                  iconName="signUp"
                  textColor={pathname === PATH.SIGN_UP ? "yellow" : "white"}
                  iconSize="1.8"
                  to={PATH.SIGN_UP}
                  textHoverColor="yellow"
                />
              </>
            )}

            {/* Language Options */}
            <div className="flex gap-x-2 items-center h-fit sm:pl-4">
              <IconButton
                className="sm:flex hidden"
                iconName="vietnamFlag"
                width="35px"
                height="30px"
                onClick={() => handleLanguageChange("vi")}
              />
              <IconButton
                className="sm:flex hidden"
                iconName="chinaFlag"
                width="35px"
                height="30px"
                onClick={() => handleLanguageChange("zh")}
              />
              <IconButton
                className="sm:flex hidden"
                iconName="japanFlag"
                width="35px"
                height="30px"
                onClick={() => handleLanguageChange("jp")}
              />
              <IconButton
                className="sm:flex hidden"
                iconName="englandFlag"
                width="35px"
                height="30px"
                onClick={() => handleLanguageChange("en")}
              />
            </div>
          </div>
        </div>

        <DrawerMenu
          renderTitle={renderTitleCartDrawer}
          renderContent={renderContentCartDrawer}
          handleClose={handleCloseCartDrawer}
          handleOpen={handleOpenCartDrawer}
          handleOverlayClick={handleCloseCartDrawer}
          isOpen={isOpenCartDrawer}
          position={isLargerThanSm ? "right" : "bottom"}
          width={isLargerThanSm ? "350px" : "100%"}
          borderColor="transparent"
          bgColor="white"
        />

        <DrawerMenu
          renderTitle={renderTitleNavDrawer}
          renderContent={renderContentNavBarDrawer}
          handleOverlayClick={handleCloseNavDrawer}
          handleClose={handleCloseNavDrawer}
          handleOpen={handleOpenNavDrawer}
          isOpen={isOpenNavDrawer}
          position={isLargerThanSm ? "left" : "top"}
          width={isLargerThanSm ? "350px" : "100%"}
          borderColor="transparent"
          bgColor="emerald"
        />
      </header>
    </>
  );
};

export default Header;
