import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import {
  getManufacturerList,
  useAddProduct,
  useGenerateProductDescription,
  useTranslateProduct,
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
import { getCategoryList } from "../../../service/https/category";

const ProductCreate = () => {
  const [reviewList, setReviewList] = useState();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { trigger: handleAddProduct } = useAddProduct();
  const { trigger: handleGenerateDescription } =
    useGenerateProductDescription();
  const { trigger: handleTranslateProduct } = useTranslateProduct();

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
          price: "",
          manufacturerId: null,
          categoryId: null,
          description: "",
          costPrice: "",
          // Multi-language fields
          nameEn: "",
          nameZh: "",
          nameJa: "",
          descriptionEn: "",
          descriptionZh: "",
          descriptionJa: "",
        }}
        validationSchema={validateSchema(t)}
        onSubmit={(values) => {
          const convertValue = {
            name: values.name,
            nameEn: values.nameEn,
            nameJa: values.nameJa,
            nameZh: values.nameZh,
            price: values.price,
            manufacturerId: values.manufacturerId._id,
            categoryId: values.categoryId._id,
            description: values.description,
            descriptionEn: values.descriptionEn,
            descriptionJa: values.descriptionJa,
            descriptionZh: values.descriptionZh,
            images: values.images || [],
            costPrice: values.costPrice,
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
        {({ values, resetForm, setFieldValue }) => {
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
                <FormikTextField
                  name="costPrice"
                  label={t("product.create.costPrice")}
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

                {/* Multi-language fields */}
                <div className="col-span-2 mt-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-700">
                    Thông tin đa ngôn ngữ
                  </h3>
                </div>

                {/* English fields */}
                <FormikTextField
                  name="nameEn"
                  label="Tên tiếng Anh"
                  labelWidth="150px"
                  width="80%"
                  vertical={false}
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                />

                <FormikTextField
                  name="nameZh"
                  label="Tên tiếng Trung"
                  labelWidth="150px"
                  width="80%"
                  vertical={false}
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                />

                <FormikTextField
                  name="nameJa"
                  label="Tên tiếng Nhật"
                  labelWidth="150px"
                  width="80%"
                  vertical={false}
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                />
                <FormikTextArea
                  name="descriptionEn"
                  label="Mô tả tiếng Anh"
                  labelWidth="150px"
                  vertical={false}
                  width="90.5%"
                  className="col-span-2"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                />

                {/* Chinese fields */}

                <FormikTextArea
                  name="descriptionZh"
                  label="Mô tả tiếng Trung"
                  labelWidth="150px"
                  vertical={false}
                  width="90.5%"
                  className="col-span-2"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                />

                {/* Japanese fields */}

                <FormikTextArea
                  name="descriptionJa"
                  label="Mô tả tiếng Nhật"
                  labelWidth="150px"
                  vertical={false}
                  width="90.5%"
                  className="col-span-2"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                />

                <div className="col-span-2 mt-4 flex gap-3 justify-end w-[90%]">
                  <Button
                    variant="outlined"
                    borderColor="blue"
                    textColor="blue"
                    type="button"
                    bgHoverColor="blue-300"
                    disabled={!values.name || !values.description}
                    onClick={() => {
                      handleTranslateProduct(
                        {
                          name: values.name,
                          description: values.description,
                        },
                        {
                          onSuccess: (response) => {
                            console.log("response", response);
                            if (validateStatus(response.code)) {
                              toast.success(
                                "Tạo thông tin sản phẩm thành công"
                              );
                              // Fill English fields
                              setFieldValue(
                                "nameEn",
                                response?.data?.english?.name
                              );
                              setFieldValue(
                                "descriptionEn",
                                response?.data?.english?.description
                              );
                              // Fill Chinese fields
                              setFieldValue(
                                "nameZh",
                                response?.data?.chinese?.name
                              );
                              setFieldValue(
                                "descriptionZh",
                                response?.data?.chinese?.description
                              );
                              // Fill Japanese fields
                              setFieldValue(
                                "nameJa",
                                response?.data?.japanese?.name
                              );
                              setFieldValue(
                                "descriptionJa",
                                response?.data?.japanese?.description
                              );
                            } else {
                              toast.error(response?.message);
                            }
                          },
                          onError: () => {
                            toast.error(
                              t("common.toast.hasErrorTryAgainLater")
                            );
                          },
                        }
                      );
                    }}
                  >
                    Tự động dịch thông tin sản phẩm
                  </Button>

                  <Button
                    variant="outlined"
                    borderColor="blue"
                    textColor="blue"
                    type="button"
                    bgHoverColor="blue-300"
                    disabled={
                      !values.name ||
                      !values.price ||
                      !values.manufacturerId ||
                      !values.categoryId
                    }
                    onClick={() => {
                      console.log("values", values);
                      handleGenerateDescription(
                        {
                          prompt: `Tên sản phẩm: ${values.name}, giá sản phẩm: ${values.price}, thương hiệu: ${values.manufacturerId?.name}, loại sản phẩm: ${values.categoryId?.name}`,
                        },
                        {
                          onSuccess: (response) => {
                            console.log("response", response);
                            if (validateStatus(response.code)) {
                              toast.success(
                                t("product.create.generateDescriptionSuccess")
                              );
                              setFieldValue(
                                "description",
                                response?.data?.description
                              );
                            } else {
                              toast.error(response?.message);
                            }
                          },
                          onError: () => {
                            toast.error(
                              t("common.toast.hasErrorTryAgainLater")
                            );
                          },
                        }
                      );
                    }}
                  >
                    Tự động tạo mô tả với AI
                  </Button>

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

export default ProductCreate;
