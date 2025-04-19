import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useQueryState } from "../../../hooks/useQueryState";

import { validateStatus } from "../../../utils/api";
import { PATH } from "../../../constants/path";

import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import FormikTextField from "../../../components/Formik/FormikTextField";

import {
  useDeleteContact,
  useGetContactList,
} from "../../../service/https/contact";
import DeleteDialog from "../Dialog/delete";

const ContactList = () => {
  const { page, pageSize, keyword, setMultiple } = useQueryState();
  const { t } = useTranslation();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const {
    data: contactData,
    mutate: refreshContactList,
    isLoading: isGettingContactList,
    isValidating: isValidatingContactList,
  } = useGetContactList({
    page,
    limit: pageSize,
    keyword,
  });

  const { trigger: handleDeleteContact } = useDeleteContact();

  useEffect(() => {
    refreshContactList();
  }, [page, pageSize, keyword]);

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
    setSelectedItem(null);
  };

  const handleSubmitDeleteContact = () => {
    handleDeleteContact(
      { _id: selectedItem?._id },
      {
        onSuccess: (response) => {
          if (validateStatus(response.code)) {
            toast.success(t("contact.deleteDialog.success"));
            refreshContactList();
            handleCloseDeleteDialog();
          } else {
            toast.error(response.message);
          }
        },
        onError: () => {
          toast.error(t("common.common.hasErrorTryAgainLater"));
          handleCloseDeleteDialog();
        },
      }
    );
  };

  const contactList = contactData?.data?.contacts || [];
  const headers = [
    t("contact.list.NO"),
    t("contact.list.name"),
    t("contact.list.email"),
    t("contact.list.phone"),
    t("contact.list.content"),
    t("contact.list.action"),
  ];

  const rows = contactList.map((contact, index) => [
    index + 1,
    contact.fullname,
    contact.email,
    contact.phone,
    contact.content,
    <div className="flex items-center gap-2 justify-center">
      <IconButton
        iconName="bin"
        textColor="gray-500"
        textHoverColor="blue"
        onClick={() => {
          setIsOpenDeleteDialog(true);
          setSelectedItem(contact);
        }}
      />
      <IconButton
        iconName="eye"
        textColor="gray-500"
        to={PATH.CONTACT_DETAIL.replace(":contactId", contact._id)}
      />
    </div>,
  ]);

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("contact.list.title")}
      </h2>
      <Formik
        initialValues={{ keyword }}
        onSubmit={(values) => {
          setMultiple({
            keyword: values?.keyword,
          });
        }}
      >
        {({ resetForm }) => (
          <Form>
            <div className="grid grid-cols-4 gap-10 items-center mt-10">
              <FormikTextField
                name="keyword"
                label={t("contact.list.searchContact")}
              />

              <div className="flex gap-4">
                <Button type="submit" height="40px">
                  {t("common.search")}
                </Button>
                <Button
                  height="40px"
                  onClick={() => {
                    resetForm();
                    setMultiple({ keyword: "" });
                  }}
                >
                  {t("common.deleteSearch")}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Table
        headers={headers}
        rows={rows}
        isLoading={isGettingContactList || isValidatingContactList}
      />
      <Pagination
        pageCount={contactData?.data?.totalPage}
        currentPage={page}
        className="ml-auto mt-10"
      />
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        contact={selectedItem}
        handleSubmitDeleteContact={handleSubmitDeleteContact}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default ContactList;
