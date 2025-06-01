import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import {
  getManufacturerList,
  useDeleteProduct,
  useGetProductDetail,
  useUpdateProduct,
  useGenerateProductDescription,
  useTranslateProduct,
} from "../../../service/https";
import Image from "../../../components/Image";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
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
import { useState } from "react";
import { validateStatus } from "../../../utils/api";
import { toast } from "react-toastify";
import DeleteDialog from "../Dialog/delete";
import { getCategoryList } from "../../../service/https/category";

const ProductEdit = () => {
  const params = useParams();

  const { t } = useTranslation();

  const { data: productDetail } = useGetProductDetail(params.productId);
  console.log("productDetail", productDetail);

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const navigate = useNavigate();

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  const { trigger: handleDeleteProduct } = useDeleteProduct();

  const handleSubmitDeleteProduct = () => {
    handleDeleteProduct(
      { _id: params.productId },
      {
        onSuccess: (response) => {
          if (validateStatus(response.code)) {
            toast.success(t("product.delete.success"));
            navigate(PATH.PRODUCT_LIST, { replace: true });
            handleCloseDeleteDialog();
          } else {
            toast.error(response.message);
          }
        },
        onError: () => {
          toast.error(t("common.toast.hasErrorTryAgainLater"));
          handleCloseDeleteDialog();
        },
      }
    );
  };

  const { trigger: handleUpdateProduct } = useUpdateProduct();
  const { trigger: handleGenerateDescription } =
    useGenerateProductDescription();
  const { trigger: handleTranslateProduct } = useTranslateProduct();

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("product.edit.title")}
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

        <div className="flex gap-3">
          <Button
            variant="outlined"
            borderColor="crimson"
            textColor="crimson"
            bgHoverColor="crimson-300"
            startIcon={<Icon name="bin" size={1.5} />}
            onClick={() => setIsOpenDeleteDialog(true)}
          >
            {t("common.delete")}
          </Button>
          <Button
            variant="outlined"
            startIcon={<Icon name="eye" size={1.5} />}
            to={PATH.PRODUCT_DETAIL.replace(":productId", params.productId)}
          >
            {t("common.showDetail")}
          </Button>
        </div>
      </div>
      <Formik
        initialValues={{
          _id: productDetail?._id,
          name: productDetail?.name,
          code: productDetail?.code,
          price: productDetail?.price,
          manufacturerId: productDetail?.manufacturerId,
          categoryId: productDetail?.categoryId,
          description: productDetail?.description,
          costPrice: productDetail?.costPrice,
          // Multi-language fields
          nameEn: productDetail?.nameEn || "",
          nameZh: productDetail?.nameZh || "",
          nameJa: productDetail?.nameJa || "",
          descriptionEn: productDetail?.descriptionEn || "",
          descriptionZh: productDetail?.descriptionZh || "",
          descriptionJa: productDetail?.descriptionJa || "",
        }}
        validationSchema={validateSchema(t)}
        onSubmit={(values) => {
          console.log("values", values);
          handleUpdateProduct(
            {
              _id: values?._id,
              body: {
                name: values?.name,
                nameEn: values?.nameEn,
                nameJa: values?.nameJa,
                nameZh: values?.nameZh,
                code: values?.code,
                price: values?.price,
                manufacturerId: values?.manufacturerId,
                categoryId: values?.categoryId,
                description: values?.description,
                descriptionEn: values?.descriptionEn,
                descriptionJa: values?.descriptionJa,
                descriptionZh: values?.descriptionZh,
                costPrice: values?.costPrice,
              },
            },
            {
              onSuccess: (response) => {
                if (validateStatus(response.code)) {
                  toast.success(t("product.edit.success"));
                  navigate(
                    PATH.PRODUCT_DETAIL.replace(":productId", params.productId)
                  );
                } else {
                  toast.error(response.message);
                }
              },
              onError: () => {
                toast.error(t("common.toast.hasErrorTryAgainLater"));
              },
            }
          );
        }}
        enableReinitialize
      >
        {({ resetForm, values, setFieldValue }) => {
          return (
            <Form>
              <div className="grid grid-cols-2 gap-5">
                <FormikTextField
                  name="_id"
                  label={t("product.edit.ID")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  disabled
                />

                <FormikTextField
                  name="name"
                  label={t("product.edit.name")}
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
                  label={t("product.edit.code")}
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
                  label={t("product.edit.price")}
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
                  label={t("product.edit.costPrice")}
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
                  label={t("product.edit.category")}
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
                  label={t("product.edit.manufacturer")}
                  autoFetch={true}
                  filterActive={true}
                  labelWidth="150px"
                  width="80%"
                  vertical={false}
                  required
                />

                <FormikTextArea
                  name="description"
                  label={t("product.edit.description")}
                  className="col-span-2"
                  labelWidth="150px"
                  vertical={false}
                  width="90.5%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                  required
                />

                <div className="col-span-2 mt-6">
                  <h3 className="text-lg font-medium mb-4 text-gray-700">
                    Thông tin đa ngôn ngữ
                  </h3>
                </div>

                <FormikTextField
                  name="nameEn"
                  label="Tên tiếng Anh:"
                  labelWidth="150px"
                  width="80%"
                  vertical={false}
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                />

                <FormikTextField
                  name="nameZh"
                  label="Tên tiếng Trung:"
                  labelWidth="150px"
                  width="80%"
                  vertical={false}
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                />

                <FormikTextField
                  name="nameJa"
                  label="Tên tiếng Nhật:"
                  labelWidth="150px"
                  width="80%"
                  vertical={false}
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                />
                <FormikTextArea
                  name="descriptionEn"
                  label="Mô tả tiếng Anh:"
                  labelWidth="150px"
                  vertical={false}
                  width="90.5%"
                  className="col-span-2"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                />

                <FormikTextArea
                  name="descriptionZh"
                  label="Mô tả tiếng Trung:"
                  labelWidth="150px"
                  vertical={false}
                  width="90.5%"
                  className="col-span-2"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
                  }}
                />

                <FormikTextArea
                  name="descriptionJa"
                  label="Mô tả tiếng Nhật:"
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

                              setFieldValue(
                                "nameEn",
                                response?.data?.english?.name
                              );
                              setFieldValue(
                                "descriptionEn",
                                response?.data?.english?.description
                              );

                              setFieldValue(
                                "nameZh",
                                response?.data?.chinese?.name
                              );
                              setFieldValue(
                                "descriptionZh",
                                response?.data?.chinese?.description
                              );

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
                                t("product.edit.generateDescriptionSuccess")
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
                    {t("common.edit")}
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

                <h2 className="col-span-2 text-xl mt-3 font-medium">
                  {t("product.edit.images")}
                </h2>

                {productDetail?.images?.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {productDetail?.images?.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Hình ${index + 1}`}
                        className="w-full rounded-md shadow-md transition-transform transform hover:scale-105"
                      />
                    ))}
                  </div>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        product={productDetail}
        handleSubmitDeleteProduct={handleSubmitDeleteProduct}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default ProductEdit;
