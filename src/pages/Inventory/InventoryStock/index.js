import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";

import { useQueryState } from "../../../hooks/useQueryState";
import { PATH } from "../../../constants/path";

import Button from "../../../components/Button";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";
import { useGetInventoryStock } from "../../../service/https/inventory";

const InventoryStock = () => {
  const { page, pageSize, keyword, filters, setMultiple } = useQueryState();
  const { t } = useTranslation();

  const {
    data: inventoryStockData,
    mutate: refreshInventoryStock,
    isLoading: isGettingInventoryStock,
    isValidating: isValidatingInventoryStock,
  } = useGetInventoryStock({
    page,
    limit: pageSize,
  });

  useEffect(() => {
    refreshInventoryStock();
  }, [page, pageSize, keyword, filters]);

  const stockProducts = inventoryStockData?.data?.products || [];
  const headers = [
    "STT",
    "Mã sản phẩm",
    "Tên sản phẩm",
    "Thương hiệu",
    "Loại sản phẩm",
    "Giá bán",
    "Giá vốn",
    "Số lượng tồn",
    "Trạng thái",
  ];

  const rows = stockProducts.map((product, index) => [
    index + 1,
    product.code,
    product.name,
    product.manufacturerId?.name || "N/A",
    product.categoryId?.name || "N/A",
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(product.price),
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(product.costPrice),
    <span className={`font-semibold ${
      product.quantity <= 0 ? 'text-red-600' : 
      product.quantity <= 5 ? 'text-yellow-600' : 'text-green-600'
    }`}>
      {product.quantity}
    </span>,
    <div
      className={`px-2 py-1 rounded text-center ${
        product.inStock
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {product.inStock ? "Còn hàng" : "Hết hàng"}
    </div>,
  ]);

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        Danh sách tồn kho
      </h2>
      
      <div className="flex gap-3 justify-between w-[90%] my-5">
        <Button
          variant="outlined"
          borderColor="gray-500"
          textColor="gray-500"
          bgHoverColor="blue-200"
          textHoverColor="blue"
          borderHoverColor="blue"
          to={PATH.INVENTORY_HISTORY}
        >
          {t("common.backToList")}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800">Tổng sản phẩm</h3>
            <p className="text-2xl font-bold text-blue-600">
              {inventoryStockData?.data?.pagination?.total || 0}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800">Còn hàng</h3>
            <p className="text-2xl font-bold text-green-600">
              {stockProducts.filter(p => p.inStock).length}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800">Hết hàng</h3>
            <p className="text-2xl font-bold text-red-600">
              {stockProducts.filter(p => !p.inStock).length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800">Sắp hết</h3>
            <p className="text-2xl font-bold text-yellow-600">
              {stockProducts.filter(p => p.quantity > 0 && p.quantity <= 5).length}
            </p>
          </div>
        </div>
      </div>

      <Table
        headers={headers}
        rows={rows}
        isLoading={isGettingInventoryStock || isValidatingInventoryStock}
      />
      <Pagination
        pageCount={inventoryStockData?.data?.pagination?.pages}
        currentPage={page}
        className="ml-auto mt-10"
      />
    </div>
  );
};

export default InventoryStock;
