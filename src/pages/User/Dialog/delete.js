import { toast } from "react-toastify";
import Dialog from "../../../components/Diaglog";
import LabelValue from "../../../components/LabelValue";
import { useTranslation } from "react-i18next";
import formatCurrency from "../../../utils/formatCurrency";

const DeleteDialog = ({ isOpen, onCancel, user, handleSubmitDeleteUser }) => {
  const { t } = useTranslation();
  return (
    <>
      <Dialog
        open={isOpen}
        title={t("user.deleteDialog.title")}
        onSubmit={() => {
          handleSubmitDeleteUser();
        }}
        submitLabel={t("common.confirm")}
        cancelLabel={t("common.cancel")}
        onCancel={onCancel}
      >
        <p className="my-3">{t("user.deleteDialog.content")}</p>
        <LabelValue label={t("user.deleteDialog.ID")} value={user?._id} />
        <LabelValue
          label={t("user.deleteDialog.name")}
          value={user?.fullname}
        />
      </Dialog>
    </>
  );
};

export default DeleteDialog;
