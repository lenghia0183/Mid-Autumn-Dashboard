import React from "react";
import { useTranslation } from "react-i18next";
import Dialog from "../../../../components/Diaglog";

import LabelValue from "../../../../components/LabelValue";

const DeleteDialog = ({
  isOpen,
  contact,
  handleSubmitDeleteContact,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onCancel={onCancel}
      title={t("contact.deleteDialog.title")}
      dialogClassName="w-[500px]"
      disableBackdropClick={false}
      submitLabel={t("common.confirm")}
      cancelLabel={t("common.cancel")}
      onSubmit={handleSubmitDeleteContact}
    >
      <div className="flex flex-col gap-4">
        <p className="text-gray-600">{t("contact.deleteDialog.content")}</p>
        <LabelValue label={t("contact.deleteDialog.ID")} value={contact?._id} />
        <LabelValue
          label={t("contact.deleteDialog.name")}
          value={contact?.fullname}
        />
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
