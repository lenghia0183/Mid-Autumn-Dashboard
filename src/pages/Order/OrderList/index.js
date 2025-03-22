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

const OrderList = () => {
  const { page, pageSize, keyword, filters, setMultiple } = useQueryState();
  const { t } = useTranslation();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const {
    data: productData,
    mutate: refreshProductList,
    isLoading: isGettingProductList,
    isValidating: isValidatingProductList,
  } = useGetProduct({
    page,
    limit: pageSize,
    keyword,
    categoryId: filters.categoryId,
    manufacturerId: filters.manufacturerId,
  });

  const { trigger: handleDeleteProduct } = useDeleteProduct();

  useEffect(() => {
    refreshProductList();
  }, [page, pageSize, keyword, filters]);

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
    setSelectedItem(null);
  };

  const handleSubmitDeleteProduct = () => {
    handleDeleteProduct(
      { _id: selectedItem?._id },
      {
        onSuccess: (response) => {
          if (validateStatus(response.code)) {
            toast.success(t("product.delete.success"));
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

  const productList = productData?.data?.products || [];
  const headers = [
    t("product.list.NO"),
    t("product.list.ID"),
    t("product.list.name"),
    t("product.list.manufacturer"),
    t("product.list.category"),
    t("product.list.price"),
    t("product.list.action"),
  ];

  const rows = productList.map((product, index) => [
    index + 1,
    <Button
      to={PATH.PRODUCT_DETAIL.replace(":productId", product._id)}
      size="zeroPadding"
      className="m-auto hover:underline"
    >
      {product._id}
    </Button>,
    product.name,
    product.manufacturerId.name,
    product.categoryId.name,
    formatCurrency(product.price),
    <div className="flex items-center gap-2 justify-center">
      <IconButton
        iconName="bin"
        textColor="gray-500"
        textHoverColor="blue"
        onClick={() => {
          setIsOpenDeleteDialog(true);
          setSelectedItem(product);
        }}
      />
      <IconButton
        iconName="edit"
        textColor="gray-500"
        to={PATH.PRODUCT_EDIT.replace(":productId", product._id)}
      />
      <IconButton
        iconName="eye"
        textColor="gray-500"
        to={PATH.PRODUCT_DETAIL.replace(":productId", product._id)}
      />
    </div>,
  ]);

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("product.list.title")}
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
                label={t("product.list.searchProduct")}
              />
              <FormikAutoComplete
                name="category"
                asyncRequest={getCategoryList}
                asyncRequestHelper={(res) => res.data.categories}
                getOptionsLabel={(opt) => opt?.name}
                isEqualValue={(val, opt) => val._id === opt._id}
                label={t("product.list.categoryList")}
                autoFetch
                filterActive
              />
              <FormikAutoComplete
                name="manufacturer"
                asyncRequest={getManufacturerList}
                asyncRequestHelper={(res) => res.data.manufacturers}
                getOptionsLabel={(opt) => opt?.name}
                isEqualValue={(val, opt) => val._id === opt._id}
                label={t("product.list.manufacturerList")}
                autoFetch
                filterActive
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
        to={PATH.PRODUCT_CREATE}
        bgColor="emerald"
        textColor="white"
        bgHoverColor="yellow"
        textHoverColor="dark"
      >
        {t("product.btn.addProduct")}
      </Button>
      <Table
        headers={headers}
        rows={rows}
        isLoading={isGettingProductList || isValidatingProductList}
      />
      <Pagination
        pageCount={productData?.data.totalPage}
        currentPage={page}
        className="ml-auto mt-10"
      />
      <DeleteDialog
        isOpen={isOpenDeleteDialog}
        product={selectedItem}
        handleSubmitDeleteProduct={handleSubmitDeleteProduct}
        onCancel={handleCloseDeleteDialog}
      />
    </div>
  );
};

export default OrderList;
