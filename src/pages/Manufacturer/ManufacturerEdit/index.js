import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import { PATH } from "../../../constants/path";
import FormikTextField from "../../../components/Formik/FormikTextField";

import { validateSchema } from "./schema";
import { useTranslation } from "react-i18next";
import { TEXTFIELD_REQUIRED_LENGTH } from "./../../../constants/common";
import { useState } from "react";
import { validateStatus } from "../../../utils/api";
import { toast } from "react-toastify";
import DeleteDialog from "../Dialog/delete";

import {
  useDeleteManufacturer,
  useGetManufacturerDetail,
  useUpdateManufacturer,
} from "../../../service/https";

const ManufacturerEdit = () => {
  const params = useParams();

  const { t } = useTranslation();

  const { data: manufacturerDetail } = useGetManufacturerDetail(
    params.manufacturerId
  );

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

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

  const { trigger: handleUpdateManufacturer } = useUpdateManufacturer();

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("manufacturer.edit.title")}
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
            startIcon={<Icon name="eye" size={1.5} />}
            to={PATH.MANUFACTURER_DETAIL.replace(
              ":manufacturerId",
              params.manufacturerId
            )}
          >
            {t("common.showDetail")}
          </Button>
        </div>
      </div>
      <Formik
        initialValues={{
          _id: manufacturerDetail?._id,
          name: manufacturerDetail?.name,
          image: null,
        }}
        validationSchema={validateSchema(t)}
        onSubmit={(values) => {
          handleUpdateManufacturer(
            {
              _id: values?._id,
              body: {
                name: values?.name,
                ...(values?.image?.[0] && { image: values.image[0] }),
              },
            },
            {
              onSuccess: (response) => {
                if (validateStatus(response.code)) {
                  toast.success(t("manufacturer.edit.success"));
                  navigate(
                    PATH.MANUFACTURER_DETAIL.replace(
                      ":manufacturerId",
                      params.manufacturerId
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
                  label={t("manufacturer.edit.ID")}
                  vertical={false}
                  required
                  labelWidth="150px"
                  width="80%"
                  disabled
                />

                <FormikTextField
                  name="name"
                  label={t("manufacturer.edit.name")}
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
              </div>
            </Form>
          );
        }}
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

export default ManufacturerEdit;
