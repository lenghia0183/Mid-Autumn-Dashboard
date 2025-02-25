import React from "react";

import { toast } from "react-toastify";
import { validateStatus } from "../../../utils/api";

import { useAddComment } from "../../../service/https/comment";
import FormikAutoComplete from "../../../components/Formik/FormikAutoComplete";
import FormikTextArea from "../../../components/Formik/FormikTextArea";
import Dialog from "../../../components/Diaglog";
import { useTranslation } from "react-i18next";
import validationSchema from "./schema";
import { TEXTFIELD_REQUIRED_LENGTH } from "../../../constants";

const ReviewDialog = ({ open, onCancel, selectedCartDetail, refreshOrder }) => {
  const { t } = useTranslation();

  const ratingOptions = [
    { label: t("common.rating.1"), value: 1 },
    { label: t("common.rating.2"), value: 2 },
    { label: t("common.rating.3"), value: 3 },
    { label: t("common.rating.4"), value: 4 },
    { label: t("common.rating.5"), value: 5 },
  ];

  const { trigger: handleAddComment } = useAddComment();

  const initialValues = {
    rating: ratingOptions[0],
    content: "",
  };

  return (
    <Dialog
      open={open}
      onCancel={onCancel}
      title={t("order.dialog.title")}
      submitLabel={t("order.dialog.submitLabel")}
      cancelLabel={t("order.dialog.cancel")}
      formikProps={{
        initialValues: initialValues,
        validationSchema: validationSchema(t),
        onSubmit: (values) => {
          onCancel();
          handleAddComment(
            {
              cartDetailId: selectedCartDetail._id,
              productId: selectedCartDetail.productId._id,
              rating: values.rating.value,
              content: values.content,
            },
            {
              onSuccess: (response) => {
                if (validateStatus(response.code)) {
                  toast.success(t("order.dialog.successful"));
                  refreshOrder();
                } else {
                  toast.error(response.message);
                }
              },
              onError: (error) => {
                toast.error(t("common.hasErrorTryAgainLater"));
              },
            }
          );
        },
      }}
    >
      <div className="flex flex-col gap-4">
        <FormikAutoComplete
          name="rating"
          label={t("order.dialog.rating")}
          className="mt-3"
          options={ratingOptions}
          isEqualValue={(val, opt) => {
            return val.value === opt.value;
          }}
          getOptionsLabel={(opt) => opt?.label}
          required
        />

        <FormikTextArea
          name="content"
          label={t("order.dialog.content")}
          rows={5}
          className="mt-9"
          required
          inputProps={{
            maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
          }}
        />
      </div>
    </Dialog>
  );
};

export default ReviewDialog;
