import { Form, Formik } from "formik";
import LabelValue from "../../../components/LabelValue/index";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import { PATH } from "../../../constants/path";
import { useState } from "react";
import { validateStatus } from "../../../utils/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import {
  useDeleteContact,
  useGetContactDetail,
} from "../../../service/https/contact";
import DeleteDialog from "../Dialog/delete";

const ContactDetail = () => {
  const params = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const { data: contactDetail } = useGetContactDetail(params.contactId);

  console.log("isOpenDeleteDialog", isOpenDeleteDialog);

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  const { trigger: handleDeleteContact } = useDeleteContact();

  const handleSubmitDeleteContact = () => {
    handleDeleteContact(
      { _id: params.contactId },
      {
        onSuccess: (response) => {
          if (validateStatus(response.code)) {
            toast.success(t("contact.deleteDialog.success"));
            navigate(PATH.CONTACT_LIST, { replace: true });
            handleCloseDeleteDialog();
          } else {
            toast.error(response.message);
          }
        },
        onError: () => {
          toast.error(t("common.toast.hasErrorTryAgainLater"));
          handleCloseDeleteDialog();
        },
      }
    );
  };

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("contact.detail.title")}
      </h2>
      <div className="flex gap-3 justify-between w-[90%] my-5">
        <Button
          variant="outlined"
          borderColor="gray-500"
          textColor="gray-500"
          bgHoverColor="blue-200"
          textHoverColor="blue"
          borderHoverColor="blue"
          to={PATH.CONTACT_LIST}
        >
          {t("common.backToList")}
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outlined"
            borderColor="crimson"
            textColor="crimson"
            bgHoverColor="crimson-300"
            startIcon={<Icon name="bin" size={1.5} />}
            onClick={() => {
              console.log("click");
              setIsOpenDeleteDialog(true);
            }}
          >
            {t("common.delete")}
          </Button>
        </div>
      </div>
      <Formik>
        <Form>
          <div className="grid grid-cols-2 gap-3">
            <LabelValue
              labelWidth="150px"
              label={t("contact.detail.name")}
              value={contactDetail?.fullname}
            />
            <LabelValue
              labelWidth="150px"
              label={t("contact.detail.email")}
              value={contactDetail?.email}
            />
            <LabelValue
              labelWidth="150px"
              label={t("contact.detail.phone")}
              value={contactDetail?.phone}
            />
            <div></div>
            <div className="col-span-2">
              <LabelValue
                labelWidth="150px"
                label={t("contact.detail.content")}
                value={contactDetail?.content}
              />
            </div>
          </div>
        </Form>
      </Formik>
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        contact={contactDetail}
        handleSubmitDeleteContact={handleSubmitDeleteContact}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default ContactDetail;
