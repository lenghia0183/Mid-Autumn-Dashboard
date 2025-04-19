import React from "react";
import { useTranslation } from "react-i18next";
import Dialog from "../../../../components/Dialog";
import Button from "../../../../components/Button";

const DeleteDialog = ({
  isOpen,
  contact,
  handleSubmitDeleteContact,
  onCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onCancel}
      title={t("contact.delete.title")}
      className="w-[500px]"
    >
      <div className="flex flex-col gap-4">
        <p className="text-gray-600">
          {t("contact.delete.confirm", { name: contact?.name })}
        </p>
        <div className="flex justify-end gap-4">
          <Button
            variant="outlined"
            borderColor="gray-500"
            textColor="gray-500"
            onClick={onCancel}
          >
            {t("common.cancel")}
          </Button>
          <Button
            variant="outlined"
            borderColor="crimson"
            textColor="crimson"
            onClick={handleSubmitDeleteContact}
          >
            {t("common.delete")}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
