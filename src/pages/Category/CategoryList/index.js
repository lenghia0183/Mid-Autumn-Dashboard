import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { useQueryState } from "../../../hooks/useQueryState";
import {
  getManufacturerList,
  useDeleteManufacturer,
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
import DeleteDialog from "../Dialog/delete";
import { useGetCategory } from "./../../../service/https/category";

const CategoryList = () => {
  const { page, pageSize, keyword, filters, setMultiple } = useQueryState();
  const { t } = useTranslation();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const {
    data: categoryData,
    mutate: refreshCategoryList,
    isLoading: isGettingCategoryList,
    isValidating: isValidatingCategoryList,
  } = useGetCategory({
    page,
    limit: pageSize,
    keyword,
  });

  const { trigger: handleDeleteCategory } = useDeleteManufacturer();

  useEffect(() => {
    refreshCategoryList();
  }, [page, pageSize, keyword, filters]);

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
    setSelectedItem(null);
  };

  const handleSubmitDeleteCategory = () => {
    handleDeleteCategory(
      { _id: selectedItem?._id },
      {
        onSuccess: (response) => {
          if (validateStatus(response.code)) {
            toast.success(t("category.delete.success"));
            refreshCategoryList();
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

  const categoryList = categoryData?.data?.categories || [];
  const headers = [
    t("category.list.NO"),
    t("category.list.ID"),
    t("category.list.name"),
    t("category.list.action"),
  ];

  const rows = categoryList.map((category, index) => [
    index + 1,
    <Button
      to={PATH.CATEGORY_DETAIL.replace(":categoryId", category._id)}
      size="zeroPadding"
      className="m-auto hover:underline"
    >
      {category._id}
    </Button>,
    category.name,

    <div className="flex items-center gap-2 justify-center">
      <IconButton
        iconName="bin"
        textColor="gray-500"
        textHoverColor="blue"
        onClick={() => {
          setIsOpenDeleteDialog(true);
          setSelectedItem(category);
        }}
      />
      <IconButton
        iconName="edit"
        textColor="gray-500"
        to={PATH.CATEGORY_EDIT.replace(":categoryId", category._id)}
      />
      <IconButton
        iconName="eye"
        textColor="gray-500"
        to={PATH.CATEGORY_DETAIL.replace(":categoryId", category._id)}
      />
    </div>,
  ]);

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("category.list.title")}
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
                label={t("category.list.searchCategory")}
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
        to={PATH.CATEGORY_CREATE}
        bgColor="emerald"
        textColor="white"
        bgHoverColor="yellow"
        textHoverColor="dark"
      >
        {t("category.btn.addCategory")}
      </Button>
      <Table
        headers={headers}
        rows={rows}
        isLoading={isGettingCategoryList || isValidatingCategoryList}
      />
      <Pagination
        pageCount={categoryData?.data?.totalPage}
        currentPage={page}
        className="ml-auto mt-10"
      />
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        category={selectedItem}
        handleSubmitDeleteCategory={handleSubmitDeleteCategory}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default CategoryList;
