import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import FormikTextField from "../../components/Formik/FormikTextField";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { useGetProduct } from "./../../service/https/product";
import { useQueryState } from "../../hooks/useQueryState";
import formatCurrency from "./../../utils/formatCurrency";
import IconButton from "./../../components/IconButton/index";
import { useGetCategory } from "./../../service/https/category";
import FormikAutoComplete from "../../components/Formik/FormikAutoComplete";
import { api } from "../../service/api";

const getCategoryList = () => {
  return api.get("v1/category");
};

const getManufacturerList = () => {
  return api.get("v1/manufacturer");
};

const Home = () => {
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
    <Button to="/" size="zeroPadding" className="m-auto">
      {product._id}
    </Button>,
    product.name,
    product.manufacturerId.name,
    product.categoryId.name,
    formatCurrency(product.price),
    <div className="flex items-center gap-2 justify-center">
      <IconButton iconName="bin" textColor="gray-500" />
      <IconButton iconName="edit" textColor="gray-500" />
      <IconButton iconName="eye" textColor="gray-500" />
    </div>,
  ]);

  return (
    <main className="pl-5 pt-5 h-screen">
      <div className="p-5 shadow-xl h-auto">
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
    </main>
  );
};

export default Home;
