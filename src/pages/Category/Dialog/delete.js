import { toast } from "react-toastify";
import Dialog from "../../../components/Diaglog";
import LabelValue from "../../../components/LabelValue";
import { useTranslation } from "react-i18next";
import formatCurrency from "../../../utils/formatCurrency";

const DeleteDialog = ({
  isOpen,
  onCancel,
  category,
  handleSubmitDeleteCategory,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Dialog
        open={isOpen}
        title={t("category.deleteDialog.title")}
        onSubmit={() => {
          handleSubmitDeleteCategory();
        }}
        submitLabel={t("common.confirm")}
        cancelLabel={t("common.cancel")}
        onCancel={onCancel}
      >
        <p className="my-3">{t("category.deleteDialog.content")}</p>
        <LabelValue
          label={t("category.deleteDialog.ID")}
          value={category?._id}
        />
        <LabelValue
          label={t("category.deleteDialog.name")}
          value={category?.name}
        />
      </Dialog>
    </>
  );
};

export default DeleteDialog;
