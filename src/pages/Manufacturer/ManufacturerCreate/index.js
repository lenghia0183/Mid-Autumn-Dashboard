import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  getManufacturerList,
  useAddManufacturer,
  useAddProduct,
} from "../../../service/https";
import Image from "../../../components/Image";
import Button from "../../../components/Button";

import { PATH } from "../../../constants/path";
import FormikTextField from "../../../components/Formik/FormikTextField";
import FormikAutoComplete from "../../../components/Formik/FormikAutoComplete";
import { api } from "../../../service/api";
import FormikTextArea from "./../../../components/Formik/FormikTextArea";
import { validateSchema } from "./schema";
import { useTranslation } from "react-i18next";
import {
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from "./../../../constants/common";
import FormikFileInput from "../../../components/FileInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { validateStatus } from "../../../utils/api";
import {
  getCategoryList,
  useAddCategory,
} from "../../../service/https/category";

const ManufacturerCreate = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { trigger: handleAddManufacturer } = useAddManufacturer();

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("manufacturer.create.title")}
      </h2>
      <div className="flex gap-3 justify-between w-[90%] my-5">
        <Button
          variant="outlined"
          borderColor="gray-500"
          textColor="gray-500"
          bgHoverColor="blue-200"
          textHoverColor="blue"
          borderHoverColor="blue"
          to={PATH.MANUFACTURER_LIST}
        >
          {t("common.backToList")}
        </Button>
      </div>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={validateSchema(t)}
        onSubmit={(values) => {
          console.log("values", values);

          const convertValue = {
            name: values.name,
          };

          handleAddManufacturer(convertValue, {
            onSuccess: (response) => {
              if (validateStatus(response.code)) {
                console.log("response", response);
                toast.success(t("manufacturer.create.success"));
                navigate(
                  PATH.MANUFACTURER_DETAIL.replace(
                    ":manufacturerId",
                    response?.data._id
                  )
                );
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
        {({ resetForm }) => {
          return (
            <Form>
              <div className="grid grid-cols-2 gap-5">
                <FormikTextField
                  name="name"
                  label={t("manufacturer.create.name")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <div className="col-span-2 mt-4 flex gap-3 justify-end w-[90%]">
                  <Button variant="outlined" type="submit">
                    {t("manufacturer.btn.addManufacturer")}
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

export default ManufacturerCreate;
