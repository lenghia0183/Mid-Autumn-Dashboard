import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { getManufacturerList, useAddProduct } from "../../../service/https";
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
import { getCategoryList } from "../../../service/https/category";

const CategoryCreate = () => {
  const [reviewList, setReviewList] = useState();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { trigger: handleAddProduct } = useAddProduct();

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("product.create.title")}
      </h2>
      <div className="flex gap-3 justify-between w-[90%] my-5">
        <Button
          variant="outlined"
          borderColor="gray-500"
          textColor="gray-500"
          bgHoverColor="blue-200"
          textHoverColor="blue"
          borderHoverColor="blue"
          to={PATH.PRODUCT_LIST}
        >
          {t("common.backToList")}
        </Button>
      </div>
      <Formik
        initialValues={{
          name: "",
          code: "",
          price: 10000,
          manufacturerId: null,
          categoryId: null,
          description: "",
        }}
        validationSchema={validateSchema(t)}
        onSubmit={(values) => {
          console.log("values", values);

          const convertValue = {
            name: values.name,
            code: values.code,
            price: values.price,
            manufacturerId: values.manufacturerId._id,
            categoryId: values.categoryId._id,
            description: values.description,
            images: values.images,
          };

          handleAddProduct(convertValue, {
            onSuccess: (response) => {
              if (validateStatus(response.code)) {
                console.log("response", response);
                toast.success(t("product.create.success"));
                navigate(
                  PATH.PRODUCT_DETAIL.replace(":productId", response?.data._id)
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
                  label={t("product.create.name")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <FormikTextField
                  name="code"
                  label={t("product.create.code")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />
                <FormikTextField
                  name="price"
                  label={t("product.create.price")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  allow={TEXTFIELD_ALLOW.POSITIVE_DECIMAL}
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />
                <FormikAutoComplete
                  name="categoryId"
                  asyncRequest={getCategoryList}
                  asyncRequestHelper={(res) => {
                    return res.data.categories;
                  }}
                  getOptionsLabel={(opt) => opt?.name}
                  isEqualValue={(val, opt) => val._id === opt._id}
                  label={t("product.create.category")}
                  autoFetch={true}
                  filterActive={true}
                  labelWidth="150px"
                  width="80%"
                  vertical={false}
                  required
                />

                <FormikAutoComplete
                  name="manufacturerId"
                  asyncRequest={getManufacturerList}
                  asyncRequestHelper={(res) => {
                    return res.data.manufacturers;
                  }}
                  getOptionsLabel={(opt) => opt?.name}
                  isEqualValue={(val, opt) => val._id === opt._id}
                  label={t("product.create.manufacturer")}
                  autoFetch={true}
                  filterActive={true}
                  labelWidth="150px"
                  width="80%"
                  vertical={false}
                  required
                />

                <FormikTextArea
                  name="description"
                  label={t("product.create.description")}
                  className="col-span-2"
                  labelWidth="150px"
                  vertical={false}
                  width="90.5%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                  required
                />

                <div className="col-span-2 mt-4 flex gap-3 justify-end w-[90%]">
                  <Button variant="outlined" type="submit">
                    {t("product.btn.addProduct")}
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

                <FormikFileInput
                  className="w-[80%]"
                  name="images"
                  multiple
                  onPreviewsChange={(val) => {
                    setReviewList(val);
                  }}
                />

                <div className="w-[80%]">
                  <h2 className="col-span-2 text-xl mt-3 font-medium">
                    {t("product.create.images")}
                  </h2>

                  {reviewList?.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {reviewList?.map((item, index) => (
                        <div>
                          <Image
                            key={index}
                            src={item.previewUrl}
                            alt={`Hình ${index + 1}`}
                            className="w-full rounded-md shadow-md transition-transform transform hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default CategoryCreate;
