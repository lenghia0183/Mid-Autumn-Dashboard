import { Form, Formik } from "formik";
import LabelValue from "./../../../components/LabelValue/index";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProduct, useGetProductDetail } from "../../../service/https";
import formatCurrency from "./../../../utils/formatCurrency";
import Image from "../../../components/Image";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import { PATH } from "../../../constants/path";
import { useState } from "react";
import { validateStatus } from "../../../utils/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import DeleteDialog from "../Dialog/delete";
import { useDeleteUser, useGetUserDetail } from "../../../service/https/user";

const UserDetail = () => {
  const params = useParams();

  const { data: userDetail } = useGetUserDetail(params.userId);

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  const { trigger: handleDeleteUser } = useDeleteUser();

  const handleSubmitDeleteUser = () => {
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

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">{t("user.detail.title")}</h2>
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
            startIcon={<Icon name="edit" size={1.5} />}
            to={PATH.USER_EDIT.replace(":userId", params.userId)}
          >
            {t("common.edit")}
          </Button>
        </div>
      </div>
      <Formik>
        <Form>
          <div className="grid grid-cols-2 gap-3">
            <LabelValue
              labelWidth="150px"
              label={t("user.detail.ID")}
              value={userDetail?._id}
            />
            <LabelValue
              labelWidth="150px"
              label={t("user.detail.name")}
              value={userDetail?.fullname}
            />
            <LabelValue
              labelWidth="150px"
              label={t("user.detail.email")}
              value={userDetail?.email}
            />
            <LabelValue
              labelWidth="150px"
              label={t("user.detail.phone")}
              value={userDetail?.phone}
            />
            <LabelValue
              labelWidth="150px"
              label={t("user.detail.lockedStatus")}
              value={
                userDetail?.isLocked ? t("common.locked") : t("common.unLocked")
              }
            />

            <LabelValue
              labelWidth="150px"
              label={t("user.detail.role")}
              value={
                userDetail?.role === "admin"
                  ? t("common.admin")
                  : t("common.user")
              }
            />

            <h2 className="col-span-2 text-xl mt-3 font-medium">
              {t("user.detail.images")}
            </h2>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <Image
                key={userDetail?._id}
                src={userDetail?.avatar}
                alt={userDetail?.fullname}
                className="w-full rounded-md shadow-md transition-transform transform hover:scale-105"
              />
            </div>
          </div>
        </Form>
      </Formik>
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        user={userDetail}
        handleSubmitDeleteUser={handleSubmitDeleteUser}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default UserDetail;
