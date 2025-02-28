import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import {
  getManufacturerList,
  useDeleteProduct,
  useGetProductDetail,
  useUpdateProduct,
} from "../../../service/https";
import Image from "../../../components/Image";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import { PATH } from "../../../constants/path";
import FormikTextField from "../../../components/Formik/FormikTextField";
import FormikAutoComplete from "../../../components/Formik/FormikAutoComplete";
import FormikTextArea from "./../../../components/Formik/FormikTextArea";
import FormikFileInput from "./../../../components/FileInput/index";
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
import {
  getCategoryList,
  useDeleteCategory,
  useGetCategoryDetail,
  useUpdateCategory,
} from "../../../service/https/category";

const CategoryEdit = () => {
  const params = useParams();

  const { t } = useTranslation();

  const { data: categoryDetail } = useGetCategoryDetail(params.categoryId);

  console.log("categoryDetail", categoryDetail);

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  const { trigger: handleDeleteCategory } = useDeleteCategory();

  const handleSubmitDeleteCategory = () => {
    handleDeleteCategory(
      { _id: params.categoryId },
      {
        onSuccess: (response) => {
          if (validateStatus(response.code)) {
            toast.success(t("category.delete.success"));
            navigate(PATH.CATEGORY_LIST, { replace: true });
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

  const { trigger: handleUpdateCategory } = useUpdateCategory();

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("category.edit.title")}
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
            to={PATH.CATEGORY_DETAIL.replace(":categoryId", params.categoryId)}
          >
            {t("common.showDetail")}
          </Button>
        </div>
      </div>
      <Formik
        initialValues={{
          _id: categoryDetail?._id,
          name: categoryDetail?.name,
          image: categoryDetail?.image || null,
        }}
        validationSchema={validateSchema(t)}
        onSubmit={(values) => {
          console.log("values", values);
          handleUpdateCategory(
            {
              _id: values?._id,
              body: {
                name: values?.name,
                image: values?.image[0],
              },
            },
            {
              onSuccess: (response) => {
                if (validateStatus(response.code)) {
                  toast.success(t("category.edit.success"));
                  navigate(
                    PATH.CATEGORY_DETAIL.replace(
                      ":categoryId",
                      params.categoryId
                    )
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
        {({ resetForm }) => {
          return (
            <Form>
              <div className="grid grid-cols-2 gap-5">
                <FormikTextField
                  name="_id"
                  label={t("category.edit.ID")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  disabled
                />

                <FormikTextField
                  name="name"
                  label={t("category.edit.name")}
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
                  {t("category.edit.images")}
                </h2>

                <FormikFileInput
                  name="image"
                  multiple={false}
                  onPreviewsChange={(val) => {
                    setPreview(val);
                  }}
                />

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <Image
                    key={categoryDetail?._id}
                    src={preview?.[0]?.previewUrl || categoryDetail?.image}
                    alt={categoryDetail?.name}
                    className="w-full rounded-md shadow-md transition-transform transform hover:scale-105"
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        category={categoryDetail}
        handleSubmitDeleteCategory={handleSubmitDeleteCategory}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default CategoryEdit;
