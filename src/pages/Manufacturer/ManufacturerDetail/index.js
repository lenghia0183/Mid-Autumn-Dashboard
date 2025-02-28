import { Form, Formik } from "formik";
import LabelValue from "./../../../components/LabelValue/index";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteManufacturer,
  useDeleteProduct,
  useGetManufacturerDetail,
  useGetProductDetail,
} from "../../../service/https";
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

const ManufacturerDetail = () => {
  const params = useParams();

  const { data: manufacturerDetail } = useGetManufacturerDetail(
    params.manufacturerId
  );

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  console.log("manufacturerDetail", manufacturerDetail);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  const { trigger: handleDeleteManufacturer } = useDeleteManufacturer();

  const handleSubmitDeleteManufacturer = () => {
    handleDeleteManufacturer(
      { _id: params.manufacturerId },
      {
        onSuccess: (response) => {
          if (validateStatus(response.code)) {
            toast.success(t("manufacturer.delete.success"));
            navigate(PATH.MANUFACTURER_LIST, { replace: true });
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
      <h2 className="text-[28px] font-medium mb-4">
        {t("manufacturer.detail.title")}
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
            to={PATH.MANUFACTURER_EDIT.replace(
              ":manufacturerId",
              params.manufacturerId
            )}
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
              label={t("manufacturer.detail.ID")}
              value={manufacturerDetail?._id}
            />
            <LabelValue
              labelWidth="150px"
              label={t("manufacturer.detail.name")}
              value={manufacturerDetail?.name}
            />
          </div>
        </Form>
      </Formik>
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        manufacturer={manufacturerDetail}
        handleSubmitDeleteManufacturer={handleSubmitDeleteManufacturer}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default ManufacturerDetail;
