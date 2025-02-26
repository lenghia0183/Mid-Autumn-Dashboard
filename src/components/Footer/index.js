import React from "react";
import Image from "../Image";
import images from "../../asset/images";
import { useTranslation } from "react-i18next";
import useColorClasses from "../../hooks/useColorClasses";
import clsx from "clsx";
import Icon from "../Icon";
import Button from "../Button";
import { PATH } from "../../constants/path";
import Divider from "../Devider";
import { useGetCategory } from "./../../service/https/category";

const Footer = ({
  textColor = "white-100",
  bgColor = "dark-900",
  className,
}) => {
  const { t } = useTranslation();
  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { textColor: newTextColor } = useColorClasses({ textColor });

  const { data: categoryList } = useGetCategory(false) || [];

  return (
    <footer
      className={clsx("w-full py-10", newBgColor, newTextColor, className)}
    >
      <div className="container mt-3">
        <Divider color="dark-600" />
      </div>

      {/* Copyright Section */}
      <div className="w-full text-center mt-3">
        <p className="text-white text-base">
          &copy; {new Date().getFullYear()} {t("footer.copyRight")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
