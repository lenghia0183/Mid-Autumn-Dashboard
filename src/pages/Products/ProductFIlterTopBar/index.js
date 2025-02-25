import React from "react";

import Button from "../../../components/Button";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const ProductFilterTopBar = ({ setFieldValue, values }) => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-x-4 mb-4 bg-white shadow-md xl:h-[120px] h-fit px-3 xl:py-0 py-5">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="text-lg font-medium hidden sm:block">
          {t("products.displayBy")}
        </div>

        <Button
          type="submit"
          height="50px"
          className={clsx("text-lg hover:text-dark hidden sm:block", {
            "bg-yellow text-dark hover:text-white":
              values.displayOption === "createdAt:desc",
          })}
          onClick={() => setFieldValue("displayOption", "createdAt:desc")}
        >
          {t("products.latest")}
        </Button>

        <Button
          type="submit"
          height="50px"
          className={clsx("text-lg hover:text-dark hidden sm:block", {
            "bg-yellow text-dark hover:text-white":
              values.displayOption === "ratings:desc",
          })}
          onClick={() => setFieldValue("displayOption", "ratings:desc")}
        >
          {t("products.highestRating")}
        </Button>

        <Button
          type="submit"
          height="50px"
          className={clsx("text-lg hover:text-dark hidden sm:block", {
            "bg-yellow text-dark hover:text-white":
              values.displayOption === "price:asc",
          })}
          onClick={() => setFieldValue("displayOption", "price:asc")}
        >
          {t("products.priceAsc")}
        </Button>

        <Button
          type="submit"
          height="50px"
          className={clsx("text-lg hover:text-dark hidden sm:block", {
            "bg-yellow text-dark hover:text-white":
              values.displayOption === "price:desc",
          })}
          onClick={() => setFieldValue("displayOption", "price:desc")}
        >
          {t("products.priceDesc")}
        </Button>
      </div>
    </div>
  );
};

export default ProductFilterTopBar;
