import React from "react";
import { Link } from "react-router-dom";
import images from "../../asset/images";
import { useTranslation } from "react-i18next";

const Breadcrumb = ({ items }) => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        backgroundImage: `url(${images?.slide2})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      className="flex items-center justify-center relative"
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.45)",
        }}
        className="h-full w-full relative inset-0 p-[100px]"
      >
        <div className="flex flex-col items-center justify-center sm:gap-y-3 gap-y-2">
          <h2 className="sm:text-[50px] text-3xl font-medium text-white-100">
            {t(items?.[items?.length - 1]?.label)}
          </h2>
          <nav className="flex items-center flex-wrap space-x-2 text-white-100 sm:text-xl text-base font-medium m-auto">
            {items?.map((item, index) => (
              <React.Fragment key={index}>
                {index < items?.length - 1 ? (
                  <Link
                    to={item?.to}
                    className="cursor-pointer hover:text-yellow text-nowrap"
                  >
                    {t(item?.label)}
                  </Link>
                ) : (
                  <span className="text-yellow text-nowrap">
                    {t(item?.label)}
                  </span>
                )}
                {index < items?.length - 1 && (
                  <span className="text-white-100">/</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
