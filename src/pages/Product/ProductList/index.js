import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";
import FormikTextField from "../../../components/Formik/FormikTextField";
import FormikAutoComplete from "../../../components/Formik/FormikAutoComplete";
import { useQueryState } from "../../../hooks/useQueryState";
import { api } from "../../../service/api";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { useGetProduct } from "../../../service/https";
import formatCurrency from "../../../utils/formatCurrency";
import { PATH } from "../../../constants/path";

const getCategoryList = () => {
  return api.get("v1/category");
};

const getManufacturerList = () => {
  return api.get("v1/manufacturer");
};

const ProductList = () => {
  const { page, pageSize, keyword, filters, setMultiple } = useQueryState();

  const {
    data: productData,
    mutate: refreshProductList,
    isLoading: isGettingProductList,
    isValidating: isValidatingProductList,
  } = useGetProduct({
    page: page,
    limit: pageSize,
    keyword: keyword,
    categoryId: filters.categoryId,
    manufacturerId: filters.manufacturerId,
  });

  useEffect(() => {
    refreshProductList();
  }, [page, pageSize, keyword, filters]);

  const productList = productData?.data?.products || [];

  const headers = [
    "STT",
    "ID",
    "Tên sản phẩm",
    "Thương hiệu",
    "Loại sản phẩm",
    "Giá",
    "Hành động",
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
      <IconButton iconName="bin" textColor="gray-500" textHoverColor="blue" />
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
      <h2 className="text-[28px] font-medium mb-4">Danh sách sản phẩm</h2>

      {/* Thanh tìm kiếm sử dụng Formik */}
      <Formik
        initialValues={{ keyword: keyword }}
        onSubmit={(values) => {
          // setKeyword(values.keyword);
          console.log("values", values);
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
              <FormikTextField name="keyword" label="Tìm kiếm sản phẩm" />
              <FormikAutoComplete
                name="category"
                asyncRequest={getCategoryList}
                asyncRequestHelper={(res) => {
                  return res.data.categories;
                }}
                getOptionsLabel={(opt) => opt?.name}
                isEqualValue={(val, opt) => val._id === opt._id}
                label="Danh sách danh mục"
                autoFetch={true}
                filterActive={true}
              />

              <FormikAutoComplete
                name="manufacturer"
                asyncRequest={getManufacturerList}
                asyncRequestHelper={(res) => {
                  return res.data.manufacturers;
                }}
                getOptionsLabel={(opt) => opt?.name}
                isEqualValue={(val, opt) => val._id === opt._id}
                label="Danh sách thương hiệu"
                autoFetch={true}
                filterActive={true}
              />

              <div className="flex gap-4">
                <Button type="submit" height="40px">
                  Tìm kiếm
                </Button>

                <Button
                  height="40px"
                  onClick={() => {
                    resetForm();
                    setMultiple({
                      keyword: "",
                      filters: {},
                    });
                  }}
                >
                  Xóa tìm kiếm
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      <Button className="my-5">Thêm sản phẩm</Button>

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
    </div>
  );
};

export default ProductList;
