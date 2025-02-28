import { toast } from "react-toastify";
import Dialog from "../../../components/Diaglog";
import LabelValue from "../../../components/LabelValue";
import { useTranslation } from "react-i18next";
import formatCurrency from "../../../utils/formatCurrency";

const DeleteDialog = ({
  isOpen,
  onCancel,
  product,
  handleSubmitDeleteProduct,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Dialog
        open={isOpen}
        title={t("product.deleteDialog.title")}
        onSubmit={() => {
          handleSubmitDeleteProduct();
        }}
        submitLabel={t("common.confirm")}
        cancelLabel={t("common.cancel")}
        onCancel={onCancel}
      >
        <p className="my-3">{t("product.deleteDialog.content")}</p>
        <LabelValue label={t("product.deleteDialog.ID")} value={product?._id} />
        <LabelValue
          label={t("product.deleteDialog.name")}
          value={product?.name}
        />
        <LabelValue
          label={t("product.deleteDialog.price")}
          value={formatCurrency(product?.price)}
        />
      </Dialog>
    </>
  );
};

export default DeleteDialog;
