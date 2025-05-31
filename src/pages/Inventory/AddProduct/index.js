import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { getProductList } from "../../../service/https";
import Image from "../../../components/Image";
import Button from "../../../components/Button";

import { PATH } from "../../../constants/path";
import FormikTextField from "../../../components/Formik/FormikTextField";
import FormikAutoComplete from "../../../components/Formik/FormikAutoComplete";
import { validateSchema } from "./schema";
import { useTranslation } from "react-i18next";
import {
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from "./../../../constants/common";

import { useState } from "react";
import { toast } from "react-toastify";
import { validateStatus } from "../../../utils/api";
import { useAddProductIntoInventory } from "../../../service/https/inventory";

const AddProduct = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { trigger: handleAddProductIntoInventory } =
    useAddProductIntoInventory();

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("inventory.addProduct.title")}
      </h2>
      <div className="flex gap-3 justify-between w-[90%] my-5">
        <Button
          variant="outlined"
          borderColor="gray-500"
          textColor="gray-500"
          bgHoverColor="blue-200"
          textHoverColor="blue"
          borderHoverColor="blue"
          to={PATH.CATEGORY_LIST}
        >
          {t("common.backToList")}
        </Button>
      </div>
      <Formik
        initialValues={{
          product: null,
          quantity: null,
          reason: "",
          note: "",
        }}
        validationSchema={validateSchema(t)}
        onSubmit={(values) => {
          const convertValue = {
            productId: values?.product._id,
            quantity: values?.quantity,
            reason: values?.reason,
            note: values?.node,
          };

          handleAddProductIntoInventory(convertValue, {
            onSuccess: (response) => {
              if (validateStatus(response.code)) {
                console.log("response", response);
                toast.success(t("inventory.addProduct.success"));
                navigate(PATH.INVENTORY_HISTORY);
              } else {
                toast.error(response?.message);
              }
            },
            onError: () => {
              toast.error(t("common.toast.hasErrorTryAgainLater"));
            },
          });
        }}
        enableReinitialize
      >
        {({ values, resetForm, errors }) => {
          console.log("errors", errors);
          console.log("values", values);
          return (
            <Form>
              <div className="grid grid-cols-2 gap-5">
                <FormikAutoComplete
                  name="product"
                  asyncRequest={getProductList}
                  asyncRequestHelper={(res) => {
                    return res?.data?.products;
                  }}
                  getOptionsLabel={(opt) => opt?.name}
                  getOptionSubLabel={(opt) => opt?.code}
                  isEqualValue={(val, opt) => val?._id === opt?._id}
                  label={t("inventory.addProduct.product")}
                  autoFetch={true}
                  filterActive={true}
                  labelWidth="150px"
                  width="80%"
                  vertical={false}
                  required
                />

                <FormikTextField
                  name="quantity"
                  label={t("inventory.addProduct.quantity")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  allow={TEXTFIELD_ALLOW.NUMERIC}
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <FormikTextField
                  name="reason"
                  label={t("inventory.addProduct.reason")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <FormikTextField
                  name="note"
                  label={t("inventory.addProduct.note")}
                  vertical={false}
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <div className="w-[250px] mt-10">
                  <h2 className="text-xl font-medium">Ảnh sản phẩm</h2>
                  {values?.product ? (
                    <Image src={values?.product?.image} className="mt-5" />
                  ) : (
                    <p className="mt-5">Bạn chưa chọn sản phẩm</p>
                  )}
                </div>

                <div className="col-span-2 mt-4 flex gap-3 justify-end w-[90%]">
                  <Button variant="outlined" type="submit">
                    {t("inventory.btn.addProduct")}
                  </Button>
                  <Button
                    variant="outlined"
                    borderColor="crimson"
                    textColor="crimson"
                    bgHoverColor="crimson-300"
                    onClick={() => {
                      resetForm();
                    }}
                  >
                    {t("common.cancel")}
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddProduct;
