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
import {
  useDeleteUser,
  useGetUserDetail,
  useUpdateUser,
} from "../../../service/https/user";
import CheckBoxGroup from "../../../components/CheckBoxGroup";
import CheckBox from "../../../components/CheckBox";
import FormikCheckBox from "../../../components/Formik/FormikCheckBox";
import RadioGroup from "./../../../components/RadioGroup/index";
import FormikRadio from "./../../../components/Formik/FormikRadio";
import FormikFileInput from "../../../components/FileInput";

const UserEdit = () => {
  const params = useParams();

  const { t } = useTranslation();

  const { data: userDetail } = useGetUserDetail(params.userId);

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  const { trigger: handleDeleteUser } = useDeleteUser();

  const handleSubmitDeleteProduct = () => {
    handleDeleteUser(
      { _id: params.userId },
      {
        onSuccess: (response) => {
          if (validateStatus(response.code)) {
            toast.success(t("user.delete.success"));
            navigate(PATH.USER_LIST, { replace: true });
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

  const { trigger: handleUpdateUser } = useUpdateUser();

  console.log("userDetail", userDetail);

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">{t("user.edit.title")}</h2>
      <div className="flex gap-3 justify-between w-[90%] my-5">
        <Button
          variant="outlined"
          borderColor="gray-500"
          textColor="gray-500"
          bgHoverColor="blue-200"
          textHoverColor="blue"
          borderHoverColor="blue"
          to={PATH.USER_LIST}
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
            to={PATH.USER_DETAIL.replace(":userId", params.userId)}
          >
            {t("common.showDetail")}
          </Button>
        </div>
      </div>
      <Formik
        initialValues={{
          _id: userDetail?._id,
          name: userDetail?.fullname,
          email: userDetail?.email,
          phone: userDetail?.phone,
          isLocked: userDetail?.isLocked,
          role: userDetail?.role,
          avatar: null,
        }}
        validationSchema={validateSchema(t)}
        onSubmit={(values) => {
          console.log("values", values);
          handleUpdateUser(
            {
              _id: values?._id,
              body: {
                fullname: values?.name,
                email: values?.email,
                phone: values?.phone,
                isLocked: values?.isLocked,
                role: values?.role,
                ...(values?.avatar?.[0] && { image: values.avatar[0] }),
              },
            },
            {
              onSuccess: (response) => {
                if (validateStatus(response.code)) {
                  toast.success(t("user.edit.success"));
                  navigate(PATH.USER_DETAIL.replace(":userId", params.userId));
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
                  label={t("user.edit.ID")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  disabled
                />

                <FormikTextField
                  name="name"
                  label={t("user.edit.name")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <FormikTextField
                  name="email"
                  label={t("user.edit.email")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <FormikTextField
                  name="phone"
                  label={t("user.edit.phone")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  inputProps={{
                    maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_50,
                  }}
                />

                <RadioGroup
                  name="isLocked"
                  vertical={false}
                  labelWidth="150px"
                  required
                  label={t("user.edit.lockedStatus")}
                >
                  <FormikRadio
                    value={true}
                    label={t("common.locked")}
                    vertical={false}
                  />
                  <FormikRadio
                    value={false}
                    label={t("common.unLocked")}
                    labelWidth="150px"
                  />
                </RadioGroup>

                <RadioGroup
                  name="role"
                  vertical={false}
                  labelWidth="150px"
                  required
                  label={t("user.edit.role")}
                >
                  <FormikRadio
                    value={"admin"}
                    label={t("common.admin")}
                    vertical={false}
                  />
                  <FormikRadio
                    value={"user"}
                    label={t("common.user")}
                    labelWidth="150px"
                  />
                </RadioGroup>

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
                  {t("user.edit.images")}
                </h2>

                <FormikFileInput
                  name="avatar"
                  multiple={false}
                  onPreviewsChange={(val) => {
                    setPreview(val);
                  }}
                />

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <Image
                    key={userDetail?._id}
                    src={preview?.[0]?.previewUrl || userDetail?.avatar}
                    alt={userDetail?.fullname}
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
        product={userDetail}
        handleSubmitDeleteProduct={handleSubmitDeleteProduct}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default UserEdit;
