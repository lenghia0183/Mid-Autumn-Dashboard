import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";

import { useQueryState } from "../../../hooks/useQueryState";
import { PATH } from "../../../constants/path";

import Button from "../../../components/Button";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { useGetInventoryHistory } from "../../../service/https/inventory";
import FormikAutoComplete from "../../../components/Formik/FormikAutoComplete";
import IconButton from "../../../components/IconButton";

const InventoryHistory = () => {
  const { page, pageSize, keyword, filters, setMultiple } = useQueryState();
  const { t } = useTranslation();

  const {
    data: inventoryHistoryData,
    mutate: refreshInventoryHistory,
    isLoading: isGettingInventoryHistory,
    isValidating: isValidatingInventoryHistory,
  } = useGetInventoryHistory({
    page,
    limit: pageSize,
    type: filters?.type?.value,
  });

  useEffect(() => {
    refreshInventoryHistory();
  }, [page, pageSize, keyword, filters]);

  const inventoryRecords = inventoryHistoryData?.data?.records || [];
  const headers = [
    t("inventory.history.NO"),
    t("inventory.history.ID"),
    t("inventory.history.productCode"),
    t("inventory.history.productName"),
    t("inventory.history.type"),
    t("inventory.history.quantity"),
    t("inventory.history.previousQuantity"),
    t("inventory.history.newQuantity"),
    t("inventory.history.reason"),
    t("inventory.history.note"),
    t("inventory.history.user"),
    t("inventory.history.date"),
    t("inventory.history.action"),
  ];

  const rows = inventoryRecords.map((record, index) => [
    index + 1,

    <Button
      to={PATH.INVENTORY_DETAIL?.replace(":inventoryId", record._id)}
      size="zeroPadding"
      className="m-auto hover:underline"
    >
      {record._id}
    </Button>,
    record.productId.code,
    <Button
      to={PATH.PRODUCT_DETAIL.replace(":productId", record.productId._id)}
      size="zeroPadding"
      className="m-auto hover:underline"
    >
      {record.productId.name}
    </Button>,
    <div
      className={`px-2 py-1 rounded ${
        record.type === "import"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {t(`inventory.type.${record.type}`)}
    </div>,
    record.quantity,
    record.previousQuantity,
    record.newQuantity,
    record.reason,
    record.note,
    record.userId.email,
    new Date(record.createdAt).toLocaleString(),
    <div className="flex items-center gap-2 justify-center">
      <IconButton
        iconName="edit"
        textColor="gray-500"
        to={PATH.INVENTORY_EDIT.replace(":inventoryId", record._id)}
      />
      <IconButton
        iconName="eye"
        textColor="gray-500"
        to={PATH.INVENTORY_DETAIL.replace(":inventoryId", record._id)}
      />
    </div>,
  ]);

  const optionType = [
    {
      label: "Nhập",
      value: "import",
    },
    {
      label: "Xuất",
      value: "export",
    },
  ];

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("inventory.history.title")}
      </h2>
      <Formik
        initialValues={{
          type: filters.type,
        }}
        onSubmit={(values) => {
          setMultiple({
            filters: {
              type: values.type,
            },
          });
        }}
      >
        {({ resetForm }) => (
          <Form>
            <div className="grid grid-cols-4 gap-10 items-center mt-10">
              <FormikAutoComplete
                label="Loại"
                name="type"
                options={optionType}
                isEqualValue={(opt, val) => {
                  return opt.value === val.value;
                }}
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
      <div className="flex gap-3 my-5">
        <Button
          to={PATH.INVENTORY_ADD_PRODUCT}
          bgColor="emerald"
          textColor="white"
          bgHoverColor="yellow"
          textHoverColor="dark"
        >
          {t("inventory.btn.addProduct")}
        </Button>
        <Button
          to={PATH.INVENTORY_STOCK}
          bgColor="blue"
          textColor="white"
          bgHoverColor="blue-600"
          textHoverColor="white"
        >
          Xem danh sách tồn kho
        </Button>
      </div>
      <Table
        headers={headers}
        rows={rows}
        isLoading={isGettingInventoryHistory || isValidatingInventoryHistory}
      />
      <Pagination
        pageCount={inventoryHistoryData?.data?.pagination?.pages}
        currentPage={page}
        className="ml-auto mt-10"
      />
    </div>
  );
};

export default InventoryHistory;
