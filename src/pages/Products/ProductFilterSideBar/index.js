import React from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../../components/Formik/FormikTextField";
import Icon from "../../../components/Icon";
import images from "./../../../asset/images/index";
import Image from "../../../components/Image";
import Divider from "../../../components/Devider";
import FormikCheckBox from "./../../../components/Formik/FormikCheckBox";
import Button from "../../../components/Button";
import Accordion from "../../../components/Accordion";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { TEXTFIELD_ALLOW } from "../../../constants";
import { PATH } from "../../../constants/path";
import { useNavigate } from "react-router-dom";
import ManufacturerListSkeleton from "../../../components/Skeletons/ManufacturerListSkeleton";
import CategoryListSkeleton from "../../../components/Skeletons/CategoryListSkeleton";

const ProductFilterSideBar = ({
  values,
  setFieldValue,
  categoryList,
  manufacturerList,
  isGetCategoryListLoading,
  isGetManufacturerListLoading,
  resetForm,
}) => {
  console.log("isGetCategoryListLoading", isGetCategoryListLoading);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const ratings = [1, 2, 3, 4, 5];
  // console.log("values", values);
  return (
    <div className="space-y-4">
      {/* Tìm kiếm */}
      <div className="xl:h-[120px] h-fit flex items-center xl:mt-0 mt-10">
        <FormikTextField
          name="keyword"
          rightIcon={<Icon name="search" color="white" />}
          rightIconClassName="bg-emerald"
          label={t("common.search")}
          inputClassName="rounded"
        />
      </div>

      {/* Danh mục sản phẩm */}
      <div className="p-4 border rounded-md shadow-md bg-white py-6">
        <div className="flex items-center gap-2">
          <Icon name="category" size={1.5} />
          <h3 className="text-2xl font-medium text-dark">
            {t("products.category")}
          </h3>
        </div>

        <Divider color="dark-300" marginTop="10px" />

        <Accordion minHeight="200px" buttonClassName="text-emerald">
          {isGetCategoryListLoading ? (
            <CategoryListSkeleton />
          ) : (
            categoryList?.map(({ name, image, _id }) => (
              <div
                key={_id}
                onClick={() => {
                  setFieldValue("category", _id);
                }}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-3 p-2">
                  <div className="w-[30px] h-[30px]">
                    <Image src={image} alt={name} />
                  </div>
                  <p
                    className={clsx("text-lg font-normal", {
                      "text-yellow": values.category === _id,
                    })}
                  >
                    {name}
                  </p>
                </div>
                <Divider color="white-100" />
              </div>
            ))
          )}
        </Accordion>
      </div>

      {/* Giá sản phẩm */}
      <div className="p-4 border rounded-md  shadow-md bg-white py-6">
        <div className="flex items-center gap-2">
          <Icon name="coin" size={1.5} color="dark" />
          <h3 className="text-2xl font-medium text-dark">
            {t("products.price")}
          </h3>
        </div>

        <Divider color="dark-300" marginTop="10px" />

        <div className="flex items-center mt-6">
          <div className="flex-1">
            <FormikTextField
              name="minPrice"
              allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
              rightIconClass="bg-emerald"
              label={t("products.minPrice")}
              inputClass="rounded text-base"
              labelClass="text-base rounded"
            />
          </div>

          <div
            className="mx-4 text-xl font-semibold text-gray-600 p-2 rounded-full"
            style={{ minWidth: "2rem" }}
          >
            -
          </div>

          <div className="flex-1">
            <FormikTextField
              name="maxPrice"
              allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
              rightIconClass="bg-emerald"
              label={t("products.maxPrice")}
              inputClass="text-base"
              labelClass="text-base"
            />
          </div>
        </div>

        <Button
          bgColor="emerald"
          bgHoverColor="yellow"
          full
          type="submit"
          className="mt-5 hover:text-dark"
        >
          {t("common.apply")}
        </Button>
      </div>

      {/* Thương hiệu */}
      <div className="p-4 border rounded-md  shadow-md bg-white py-6">
        <div className="flex items-center gap-2">
          <Icon name="vendor" size={1.5} />
          <h3 className="text-2xl font-medium text-dark">
            {t("products.brand")}
          </h3>
        </div>

        <Divider color="dark-300" marginTop="10px" />

        <Accordion minHeight="180px" buttonClassName="text-emerald">
          <div className="mt-3 ml-2">
            {isGetManufacturerListLoading ? (
              <ManufacturerListSkeleton />
            ) : (
              manufacturerList?.map(({ name, _id }) => (
                <FormikCheckBox key={_id} label={name} name={_id} />
              ))
            )}
          </div>
        </Accordion>
      </div>

      {/* Đánh giá */}
      <div className="p-4 border rounded-md  shadow-md bg-white py-6">
        <div className="flex items-center gap-2">
          <Icon name="rating" size={1.5} color="dark" />
          <h3 className="text-2xl font-medium text-dark">
            {t("products.review")}
          </h3>
        </div>

        <Divider color="dark-300" marginTop="10px" />

        <div className="flex flex-col gap-2 mt-3">
          {ratings
            .slice()
            .reverse()
            .map((rating, index) => (
              <label key={rating} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={values.rating === rating}
                  onChange={() => setFieldValue("rating", rating)}
                  className="sr-only"
                  aria-label={`Rating ${rating} stars`}
                />
                <div className="flex items-center gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <Icon
                      key={i}
                      name="starContained"
                      size={1.5}
                      color={values.rating === rating ? "yellow" : "emerald"}
                    />
                  ))}
                  {[...Array(5 - rating)].map((_, i) => (
                    <Icon
                      key={i}
                      name="starEmpty"
                      size={1.5}
                      color={values.rating === rating ? "yellow" : "emerald"}
                    />
                  ))}
                </div>
                <span className="text-lg text-dark font-medium ml-2">
                  {rating === 5 ? "" : t("products.more")}
                </span>
              </label>
            ))}
        </div>

        <Divider color="dark-300" marginTop="20px" marginBottom="20px" />

        <Button
          bgColor="emerald"
          bgHoverColor="yellow"
          full
          className="hover:text-dark"
          type="submit"
        >
          {t("common.search")}
        </Button>

        <Button
          bgColor="crimson"
          bgHoverColor="crimson-100"
          full
          className="hover:text-dark mt-3"
          onClick={() => {
            navigate(PATH.PRODUCTS);
            resetForm();
          }}
        >
          {t("common.cancel")}
        </Button>
      </div>

      {/* Ảnh */}
      <Image src={images.productFilter} className="rounded" />
    </div>
  );
};

export default ProductFilterSideBar;
