import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import {
  useGetInventoryDetail,
  useUpdateInventory,
} from "../../../service/https/inventory";
import { getProductList } from "../../../service/https/product";
import { validateSchema } from "./schema";
import { validateStatus } from "../../../utils/api";
import { PATH } from "../../../constants/path";
import {
  TEXTFIELD_ALLOW,
  TEXTFIELD_REQUIRED_LENGTH,
} from "../../../constants/common";

// Import components
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import FormikTextField from "../../../components/Formik/FormikTextField";
import FormikTextArea from "../../../components/Formik/FormikTextArea";
import FormikAutoComplete from "../../../components/Formik/FormikAutoComplete";
import LabelValue from "../../../components/LabelValue";
import Image from "../../../components/Image";

const InventoryEdit = () => {
  const params = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: inventoryDetailResponse } = useGetInventoryDetail(
    params.inventoryId
  );
  const inventoryDetail = inventoryDetailResponse?.data;

  const { trigger: handleUpdateInventory } = useUpdateInventory();

  const handleInventoryUpdateSubmit = (values) => {
    handleUpdateInventory(
      {
        _id: values?._id,
        body: {
          productId: values?.productId?._id,
          quantity: values?.quantity,
          reason: values?.reason,
          note: values?.note,
        },
      },
      {
        onSuccess: (response) => {
          if (validateStatus(response.code)) {
            toast.success(t("inventory.edit.success"));
            navigate(
              PATH.INVENTORY_DETAIL.replace(":inventoryId", params.inventoryId)
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
  };

  return (
    <div>
      {/* Header */}
      <>
        <h2 className="text-[28px] font-medium mb-4">
          {t("inventory.edit.title")}
        </h2>

        <div className="flex gap-3 justify-between w-[90%] my-5">
          <Button
            variant="outlined"
            borderColor="gray-500"
            textColor="gray-500"
            bgHoverColor="blue-200"
            textHoverColor="blue"
            borderHoverColor="blue"
            to={PATH.INVENTORY_HISTORY}
          >
            {t("common.backToList")}
          </Button>

          <div className="flex gap-3">
            <Button
              variant="outlined"
              startIcon={<Icon name="eye" size={1.5} />}
              to={PATH.INVENTORY_DETAIL.replace(
                ":inventoryId",
                params.inventoryId
              )}
            >
              {t("common.showDetail")}
            </Button>
          </div>
        </div>
      </>

      <Formik
        initialValues={{
          _id: inventoryDetail?._id,
          productId: inventoryDetail?.productId,
          quantity: inventoryDetail?.quantity,
          reason: inventoryDetail?.reason,
          note: inventoryDetail?.note,
        }}
        validationSchema={validateSchema(t)}
        onSubmit={handleInventoryUpdateSubmit}
        enableReinitialize
      >
        {({ resetForm, values }) => {
          console.log("values", values);
          return (
            <Form>
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
                      src={
                        values?.productId?.image || values?.productId?.images[0]
                      }
                      alt={values?.productId?.name}
                      className="mt-5 max-w-[250px]"
                    />
                  ) : (
                    <p className="mt-5">{t("inventory.edit.noImage")}</p>
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

export default InventoryEdit;
