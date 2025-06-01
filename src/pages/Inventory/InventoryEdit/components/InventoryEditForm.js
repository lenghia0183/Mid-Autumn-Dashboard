import React from "react";
import { useTranslation } from "react-i18next";
import {
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from "../../../../constants/common";
import { PATH } from "../../../../constants/path";

import Button from "../../../../components/Button";
import FormikTextField from "../../../../components/Formik/FormikTextField";
import FormikTextArea from "../../../../components/Formik/FormikTextArea";
import FormikAutoComplete from "../../../../components/Formik/FormikAutoComplete";
import LabelValue from "../../../../components/LabelValue";
import { getProductList } from "../../../../service/https/product";

const InventoryEditForm = ({ inventoryDetail, resetForm, values }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-5">
      {/* Read-only fields */}
      <LabelValue
        labelWidth="150px"
        label={t("inventory.edit.ID")}
        value={inventoryDetail?._id}
      />

      <LabelValue
        labelWidth="150px"
        label={t("inventory.edit.productCode")}
        value={inventoryDetail?.productId?.code}
      />

      <FormikAutoComplete
        name="productId"
        asyncRequest={getProductList}
        asyncRequestHelper={(res) => {
          return res?.data?.products;
        }}
        getOptionsLabel={(opt) => opt?.name}
        getOptionSubLabel={(opt) => opt?.code}
        isEqualValue={(val, opt) => val?._id === opt?._id}
        label={t("inventory.edit.productName")}
        autoFetch={true}
        filterActive={true}
        labelWidth="150px"
        width="80%"
        vertical={false}
        required
      />

      <LabelValue
        labelWidth="150px"
        label={t("inventory.edit.type")}
        value={
          <div
            className={`px-2 py-1 rounded inline-block ${
              inventoryDetail?.type === "import"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {t(`inventory.type.${inventoryDetail?.type}`)}
          </div>
        }
      />

      <LabelValue
        labelWidth="150px"
        label={t("inventory.edit.previousQuantity")}
        value={inventoryDetail?.previousQuantity}
      />

      <LabelValue
        labelWidth="150px"
        label={t("inventory.edit.newQuantity")}
        value={inventoryDetail?.newQuantity}
      />

      <LabelValue
        labelWidth="150px"
        label={t("inventory.edit.user")}
        value={inventoryDetail?.userId?.email}
      />

      <LabelValue
        labelWidth="150px"
        label={t("inventory.edit.date")}
        value={new Date(inventoryDetail?.createdAt).toLocaleString()}
      />

      {/* Editable fields */}
      <FormikTextField
        name="quantity"
        label={t("inventory.edit.quantity")}
        vertical={false}
        required
        labelWidth="150px"
        width="80%"
        allow={TEXTFIELD_ALLOW.POSITIVE_INTEGER}
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_10,
        }}
      />

      <FormikTextField
        name="reason"
        label={t("inventory.edit.reason")}
        vertical={false}
        required
        labelWidth="150px"
        width="80%"
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.MAX_100,
        }}
      />

      <FormikTextArea
        name="note"
        label={t("inventory.edit.note")}
        className="col-span-2"
        labelWidth="150px"
        vertical={false}
        width="90.5%"
        inputProps={{
          maxLength: TEXTFIELD_REQUIRED_LENGTH.COMMON,
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

      <div className="w-[250px] mt-10">
        <h2 className="text-xl font-medium">
          {t("inventory.edit.productImage")}
        </h2>
        {values?.productId ? (
          <img
            src={values?.productId?.image || values?.productId?.images[0]}
            alt={values?.productId?.name}
            className="mt-5 max-w-[250px]"
          />
        ) : (
          <p className="mt-5">{t("inventory.edit.noImage")}</p>
        )}
      </div>
    </div>
  );
};

export default InventoryEditForm;
