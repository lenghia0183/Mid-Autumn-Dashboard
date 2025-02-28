import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useQueryState } from "../../../hooks/useQueryState";
import {
  useDeleteManufacturer,
  useGetManufacturer,
} from "../../../service/https";

import { validateStatus } from "../../../utils/api";

import { PATH } from "../../../constants/path";

import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import FormikTextField from "../../../components/Formik/FormikTextField";
import DeleteDialog from "../Dialog/delete";

const ManufacturerList = () => {
  const { page, pageSize, keyword, filters, setMultiple } = useQueryState();
  const { t } = useTranslation();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const {
    data: manufacturerData,
    mutate: refreshManufacturerList,
    isLoading: isGettingManufacturerList,
    isValidating: isValidatingManufacturerList,
  } = useGetManufacturer({
    page,
    limit: pageSize,
    keyword,
  });

  const { trigger: handleDeleteManufacturer } = useDeleteManufacturer();

  useEffect(() => {
    refreshManufacturerList();
  }, [page, pageSize, keyword, filters]);

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
    setSelectedItem(null);
  };

  const handleSubmitDeleteManufacturer = () => {
    handleDeleteManufacturer(
      { _id: selectedItem?._id },
      {
        onSuccess: (response) => {
          if (validateStatus(response.code)) {
            toast.success(t("manufacturer.delete.success"));
            refreshManufacturerList();
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

  const categoryList = manufacturerData?.data?.manufacturers || [];
  const headers = [
    t("manufacturer.list.NO"),
    t("manufacturer.list.ID"),
    t("manufacturer.list.name"),
    t("manufacturer.list.action"),
  ];

  const rows = categoryList.map((manufacturer, index) => [
    index + 1,
    <Button
      to={PATH.MANUFACTURER_DETAIL.replace(":manufacturerId", manufacturer._id)}
      size="zeroPadding"
      className="m-auto hover:underline"
    >
      {manufacturer._id}
    </Button>,
    manufacturer.name,

    <div className="flex items-center gap-2 justify-center">
      <IconButton
        iconName="bin"
        textColor="gray-500"
        textHoverColor="blue"
        onClick={() => {
          setIsOpenDeleteDialog(true);
          setSelectedItem(manufacturer);
        }}
      />
      <IconButton
        iconName="edit"
        textColor="gray-500"
        to={PATH.MANUFACTURER_EDIT.replace(":manufacturerId", manufacturer._id)}
      />
      <IconButton
        iconName="eye"
        textColor="gray-500"
        to={PATH.MANUFACTURER_DETAIL.replace(
          ":manufacturerId",
          manufacturer._id
        )}
      />
    </div>,
  ]);

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("manufacturer.list.title")}
      </h2>
      <Formik
        initialValues={{ keyword }}
        onSubmit={(values) => {
          setMultiple({
            keyword: values?.keyword,
            filters: {
              categoryId: values?.category ? values?.category._id : null,
              manufacturerId: values?.manufacturer
                ? [values?.manufacturer._id]
                : null,
            },
          });
        }}
      >
        {({ resetForm }) => (
          <Form>
            <div className="grid grid-cols-4 gap-10 items-center mt-10">
              <FormikTextField
                name="keyword"
                label={t("manufacturer.list.searchManufacturer")}
              />

              <div className="flex gap-4">
                <Button type="submit" height="40px">
                  {t("common.search")}
                </Button>
                <Button
                  height="40px"
                  onClick={() => {
                    resetForm();
                    setMultiple({ keyword: "", filters: {} });
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
        to={PATH.MANUFACTURER_CREATE}
        bgColor="emerald"
        textColor="white"
        bgHoverColor="yellow"
        textHoverColor="dark"
      >
        {t("manufacturer.btn.addManufacturer")}
      </Button>
      <Table
        headers={headers}
        rows={rows}
        isLoading={isGettingManufacturerList || isValidatingManufacturerList}
      />
      <Pagination
        pageCount={manufacturerData?.data?.totalPage}
        currentPage={page}
        className="ml-auto mt-10"
      />
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        manufacturer={selectedItem}
        handleSubmitDeleteManufacturer={handleSubmitDeleteManufacturer}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default ManufacturerList;
