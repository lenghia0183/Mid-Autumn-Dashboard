import { toast } from "react-toastify";
import Dialog from "../../../components/Diaglog";
import LabelValue from "../../../components/LabelValue";
import { useTranslation } from "react-i18next";

const DeleteDialog = ({
  isOpen,
  onCancel,
  manufacturer,
  handleSubmitDeleteManufacturer,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Dialog
        open={isOpen}
        title={t("manufacturer.deleteDialog.title")}
        onSubmit={() => {
          handleSubmitDeleteManufacturer();
        }}
        submitLabel={t("common.confirm")}
        cancelLabel={t("common.cancel")}
        onCancel={onCancel}
      >
        <p className="my-3">{t("manufacturer.deleteDialog.content")}</p>
        <LabelValue
          label={t("manufacturer.deleteDialog.ID")}
          value={manufacturer?._id}
        />
        <LabelValue
          label={t("manufacturer.deleteDialog.name")}
          value={manufacturer?.name}
        />
      </Dialog>
    </>
  );
};

export default DeleteDialog;
