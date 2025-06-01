import { Form, Formik } from "formik";
import LabelValue from "../../../components/LabelValue";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import { PATH } from "../../../constants/path";
import { useTranslation } from "react-i18next";
import { useGetInventoryDetail } from "../../../service/https/inventory";
import Image from "../../../components/Image";

const InventoryDetail = () => {
  const params = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: inventoryDetailResponse } = useGetInventoryDetail(
    params.inventoryId
  );
  const inventoryDetail = inventoryDetailResponse?.data;
  console.log("inventoryDetail", inventoryDetail);

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("inventory.detail.title")}
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
            startIcon={<Icon name="edit" size={1.5} />}
            to={PATH.INVENTORY_EDIT.replace(":inventoryId", params.inventoryId)}
          >
            {t("common.edit")}
          </Button>
        </div>
      </div>
      <Formik>
        <Form>
          <div className="grid grid-cols-2 gap-3 pb-14">
            <LabelValue
              labelWidth="150px"
              label={t("inventory.detail.ID")}
              value={inventoryDetail?._id}
            />
            <LabelValue
              labelWidth="150px"
              label={t("inventory.detail.productID")}
              value={
                <Button
                  to={PATH.PRODUCT_DETAIL.replace(
                    ":productId",
                    inventoryDetail?.productId?._id
                  )}
                  size="zeroPadding"
                  className="m-auto hover:underline"
                >
                  {inventoryDetail?.productId?._id}
                </Button>
              }
            />
            <LabelValue
              labelWidth="150px"
              label={t("inventory.detail.productCode")}
              value={inventoryDetail?.productId?.code}
            />
            <LabelValue
              labelWidth="150px"
              label={t("inventory.detail.productName")}
              value={
                <Button
                  to={PATH.PRODUCT_DETAIL.replace(
                    ":productId",
                    inventoryDetail?.productId?._id
                  )}
                  size="zeroPadding"
                  className="m-auto hover:underline"
                >
                  {inventoryDetail?.productId?.name}
                </Button>
              }
            />
            <LabelValue
              labelWidth="150px"
              label={t("inventory.detail.type")}
              value={
                <div
                  className={`px-2 py-1 rounded ${
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
              label={t("inventory.detail.quantity")}
              value={inventoryDetail?.quantity}
            />
            <LabelValue
              labelWidth="150px"
              label={t("inventory.detail.previousQuantity")}
              value={inventoryDetail?.previousQuantity}
            />
            <LabelValue
              labelWidth="150px"
              label={t("inventory.detail.newQuantity")}
              value={inventoryDetail?.newQuantity}
            />
            <LabelValue
              labelWidth="150px"
              label={t("inventory.detail.reason")}
              value={inventoryDetail?.reason}
            />
            <LabelValue
              labelWidth="150px"
              label={t("inventory.detail.note")}
              value={inventoryDetail?.note}
            />
            <LabelValue
              labelWidth="150px"
              label={t("inventory.detail.user")}
              value={inventoryDetail?.userId?.email}
            />
            <LabelValue
              labelWidth="150px"
              label={t("inventory.detail.date")}
              value={
                inventoryDetail?.createdAt &&
                new Date(inventoryDetail.createdAt).toLocaleString()
              }
            />

            <div className="w-[250px] mt-10 col-span-2">
              <h2 className="text-xl font-medium">
                {t("inventory.detail.productImage")}
              </h2>
              {inventoryDetail?.productId?.images &&
              inventoryDetail.productId.images.length > 0 ? (
                <Image
                  src={inventoryDetail.productId.images[0]}
                  className="mt-5 w-full rounded-md shadow-md transition-transform transform hover:scale-105"
                  alt={inventoryDetail.productId.name}
                />
              ) : (
                <p className="mt-5">{t("inventory.detail.noProductImage")}</p>
              )}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default InventoryDetail;
