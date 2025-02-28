import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useQueryState } from "../../../hooks/useQueryState";
import {
  getManufacturerList,
  useDeleteProduct,
  useGetProduct,
} from "../../../service/https";
import { getCategoryList } from "../../../service/https/category";
import { validateStatus } from "../../../utils/api";
import formatCurrency from "../../../utils/formatCurrency";
import { PATH } from "../../../constants/path";

import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import FormikTextField from "../../../components/Formik/FormikTextField";
import FormikAutoComplete from "../../../components/Formik/FormikAutoComplete";
import DeleteDialog from "../Dialog/delete";
import { useGetUser } from "../../../service/https/user";
import CheckBox from "./../../../components/CheckBox/index";

const UserList = () => {
  const { page, pageSize, keyword, setKeyword } = useQueryState();
  const { t } = useTranslation();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const {
    data: userData,
    mutate: refreshProductList,
    isLoading: isGettingUserList,
    isValidating: isValidatingUserList,
  } = useGetUser({
    page,
    limit: pageSize,
    keyword,
  });

  console.log("userData", userData);

  const { trigger: handleDeleteProduct } = useDeleteProduct();

  useEffect(() => {
    refreshProductList();
  }, [page, pageSize, keyword]);

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
    setSelectedItem(null);
  };

  const handleSubmitDeleteUser = () => {
    handleDeleteProduct(
      { _id: selectedItem?._id },
      {
        onSuccess: (response) => {
          if (validateStatus(response.code)) {
            toast.success(t("user.delete.success"));
            refreshProductList();
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

  const userList = userData?.data?.users || [];
  const headers = [
    t("user.list.NO"),
    t("user.list.ID"),
    t("user.list.name"),
    t("user.list.email"),
    t("user.list.phone"),
    t("user.list.lockedStatus"),
    t("user.list.action"),
  ];

  const rows = userList.map((user, index) => [
    index + 1,
    <Button
      to={PATH.USER.replace(":userId", user?._id)}
      size="zeroPadding"
      className="m-auto hover:underline"
    >
      {user?._id}
    </Button>,
    user?.fullname,
    user?.email,
    user?.phone,
    <CheckBox
      checked={user?.isLocked}
      label=""
      className="justify-center"
      disabled
    />,

    <div className="flex items-center gap-2 justify-center">
      <IconButton
        iconName="bin"
        textColor="gray-500"
        textHoverColor="blue"
        onClick={() => {
          setIsOpenDeleteDialog(true);
          setSelectedItem(user);
        }}
      />
      <IconButton
        iconName="edit"
        textColor="gray-500"
        to={PATH.USER_EDIT.replace(":userId", user?._id)}
      />
      <IconButton
        iconName="eye"
        textColor="gray-500"
        to={PATH.USER.replace(":userId", user?._id)}
      />
    </div>,
  ]);

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">{t("user.list.title")}</h2>
      <Formik
        initialValues={{ keyword }}
        onSubmit={(values) => {
          setKeyword(values.keyword);
        }}
      >
        {({ resetForm }) => (
          <Form>
            <div className="grid grid-cols-4 gap-10 items-center mt-10">
              <FormikTextField
                name="keyword"
                label={t("user.list.searchProduct")}
              />

              <div className="flex gap-4">
                <Button type="submit" height="40px">
                  {t("common.search")}
                </Button>
                <Button
                  height="40px"
                  onClick={() => {
                    resetForm();
                    setKeyword("");
                  }}
                >
                  {t("common.deleteSearch")}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <Button
        className="my-5"
        to={PATH.USER_CREATE}
        bgColor="emerald"
        textColor="white"
        bgHoverColor="yellow"
        textHoverColor="dark"
      >
        {t("user.btn.addUser")}
      </Button>
      <Table
        headers={headers}
        rows={rows}
        isLoading={isGettingUserList || isValidatingUserList}
      />
      <Pagination
        pageCount={userData?.data?.totalPage}
        currentPage={page}
        className="ml-auto mt-10"
      />
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        user={selectedItem}
        handleSubmitDeleteUser={handleSubmitDeleteUser}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default UserList;
