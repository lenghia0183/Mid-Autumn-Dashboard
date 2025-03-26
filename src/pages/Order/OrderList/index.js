import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";

import { useQueryState } from "../../../hooks/useQueryState";

import formatCurrency from "../../../utils/formatCurrency";
import { PATH } from "../../../constants/path";

import Button from "../../../components/Button";
import IconButton from "../../../components/IconButton";
import Table from "../../../components/Table";
import Pagination from "../../../components/Pagination";

import { useGetOrder } from "./../../../service/https/order";
import { ORDER_STATUS, PAYMENT_METHOD } from "../../../constants";

const getOrderStatusColor = (status) => {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return "text-yellow-600 bg-yellow-200";
    case ORDER_STATUS.CANCELED:
      return "text-crimson-600 bg-crimson-200";
    case ORDER_STATUS.CONFIRMED:
      return "text-blue-600 bg-blue-200";
    case ORDER_STATUS.REJECT:
      return "text-dark-600 bg-dark-200";
    case ORDER_STATUS.SHIPPING:
      return "text-yellow-600 bg-yellow-200";
    case ORDER_STATUS.SUCCESS:
      return "text-green-600 bg-green-200";
    default:
      return "text-gray-600 bg-gray-200";
  }
};
const OrderList = () => {
  const { page, pageSize } = useQueryState();
  const { t } = useTranslation();

  const {
    data: orderData,
    mutate: refreshProductList,
    isLoading: isGettingProductList,
    isValidating: isValidatingProductList,
  } = useGetOrder({
    page,
    limit: pageSize,
  });

  useEffect(() => {
    refreshProductList();
  }, [page, pageSize]);

  const orderList = orderData?.data?.orders || [];
  const headers = [
    t("order.list.NO"),
    t("order.list.ID"),
    t("order.list.buyerName"),
    t("order.list.buyerPhone"),
    t("order.list.recipientName"),
    t("order.list.recipientPhone"),
    t("order.list.totalAmount"),
    t("order.list.paymentMethod"),
    t("order.list.status"),
    t("order.list.action"),
  ];

  const rows = orderList.map((order, index) => [
    index + 1,
    <Button
      to={PATH.ORDER_DETAIL.replace(":orderId", order?._id)}
      size="zeroPadding"
      className="m-auto hover:underline"
    >
      {order._id}
    </Button>,
    order?.buyerName,
    order?.buyerPhone,
    order?.recipientName,
    order?.recipientPhone,
    formatCurrency(order?.totalAmount),
    order?.paymentMethod === PAYMENT_METHOD.BANK
      ? t("common.paymentMethod.bank")
      : t("common.paymentMethod.cod"),
    <div className={`px-2 py-1 rounded ${getOrderStatusColor(order?.status)}`}>
      {t(`common.orderStatus.${order?.status}`)}
    </div>,
    <div className="flex items-center gap-2 justify-center">
      <IconButton
        iconName="eye"
        textColor="gray-500"
        to={PATH.ORDER_DETAIL.replace(":orderId", order?._id)}
      />
    </div>,
  ]);

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">{t("order.list.title")}</h2>

      <Table
        headers={headers}
        rows={rows}
        isLoading={isGettingProductList || isValidatingProductList}
      />
      <Pagination
        pageCount={orderData?.data?.totalPage}
        currentPage={page}
        className="ml-auto mt-10"
      />
    </div>
  );
};

export default OrderList;
