import { Form, Formik } from "formik";
import LabelValue from "./../../../components/LabelValue/index";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProduct, useGetProductDetail } from "../../../service/https";
import formatCurrency from "./../../../utils/formatCurrency";
import Image from "../../../components/Image";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import { PATH } from "../../../constants/path";
import { useState } from "react";
import { validateStatus } from "../../../utils/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  useChangeOrderStatus,
  useGetOrderDetail,
} from "../../../service/https/order";
import { ORDER_STATUS, PAYMENT_METHOD } from "../../../constants";
import Table from "../../../components/Table";
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
      return "text-emerald-600 bg-emerald-200";
    case ORDER_STATUS.SUCCESS:
      return "text-green-600 bg-green-200";
    default:
      return "text-gray-600 bg-gray-200";
  }
};
const OrderDetail = () => {
  const params = useParams();

  const { data: orderDetail } = useGetOrderDetail(params.orderId);

  const { trigger: updateOrderStatus } = useChangeOrderStatus(params.orderId);

  console.log("orderDetail", orderDetail);

  const { t } = useTranslation();

  const headers = [
    t("order.detail.cartDetail.NO"),
    t("order.detail.cartDetail.productId"),
    t("order.detail.cartDetail.productName"),
    t("order.detail.cartDetail.productPrice"),
    t("order.detail.cartDetail.quantity"),
    t("order.detail.cartDetail.totalMoney"),
  ];

  const orderList = orderDetail?.cartDetails || [];

  console.log("orderList", orderList);

  const rows = orderList.map((order, index) => [
    index + 1,
    <Button
      to={PATH.PRODUCT_DETAIL.replace(":productId", order?.productId._id)}
      size="zeroPadding"
      className="m-auto hover:underline"
    >
      {order._id}
    </Button>,
    order?.productId.name,
    formatCurrency(order?.productId.price),
    order?.quantity,
    formatCurrency(order?.totalMoney),
  ]);

  return (
    <div>
      <h2 className="text-[28px] font-medium mb-4">
        {t("order.detail.title")}
      </h2>
      <div className="flex gap-3 justify-between w-[90%] my-5">
        <Button
          variant="outlined"
          borderColor="gray-500"
          textColor="gray-500"
          bgHoverColor="blue-200"
          textHoverColor="blue"
          borderHoverColor="blue"
          to={PATH.ORDER_LIST}
        >
          {t("common.backToList")}
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outlined"
            borderColor="crimson"
            textColor="crimson"
            bgHoverColor="crimson-300"
            startIcon={<Icon name="bin" size={1.5} />}
            onClick={() => {
              updateOrderStatus({ status: ORDER_STATUS.SHIPPING });
            }}
          >
            {t("common.delete")}
          </Button>
          <Button
            variant="outlined"
            startIcon={<Icon name="edit" size={1.5} />}
            to={PATH.PRODUCT_EDIT.replace(":orderId", params.orderId)}
          >
            {t("common.edit")}
          </Button>
        </div>
      </div>
      <Formik>
        <Form>
          <div className="grid grid-cols-2 gap-3">
            <LabelValue
              labelWidth="210px"
              label={t("order.detail.ID")}
              value={orderDetail?._id}
            />
            <LabelValue
              labelWidth="210px"
              label={t("order.detail.status")}
              value={
                <div
                  className={`px-2 py-1 rounded ${getOrderStatusColor(
                    orderDetail?.status
                  )}`}
                >
                  {t(`common.orderStatus.${orderDetail?.status}`)}
                </div>
              }
            />

            <LabelValue
              labelWidth="210px"
              label={t("order.detail.paymentMethod")}
              value={
                orderDetail?.paymentMethod === PAYMENT_METHOD.BANK
                  ? t("common.paymentMethod.bank")
                  : t("common.paymentMethod.cod")
              }
            />

            <LabelValue
              labelWidth="210px"
              label={t("order.detail.paymentStatus")}
              value={
                orderDetail?.isPaid
                  ? t("common.paymentStatus.paid")
                  : t("common.paymentStatus.unPaid")
              }
            />

            <LabelValue
              labelWidth="210px"
              label={t("order.detail.buyerName")}
              value={orderDetail?.buyerName}
            />
            <LabelValue
              labelWidth="210px"
              label={t("order.detail.recipientName")}
              value={orderDetail?.recipientName}
            />
            <LabelValue
              labelWidth="210px"
              label={t("order.detail.buyerPhone")}
              value={orderDetail?.buyerPhone}
            />
            <LabelValue
              labelWidth="210px"
              label={t("order.detail.recipientPhone")}
              value={orderDetail?.recipientPhone}
            />
            <LabelValue
              labelWidth="210px"
              label={t("order.detail.buyerEmail")}
              value={orderDetail?.buyerEmail}
            />

            <LabelValue
              labelWidth="210px"
              label={t("order.detail.province")}
              value={orderDetail?.address.province.provinceName}
            />
            <LabelValue
              labelWidth="210px"
              label={t("order.detail.district")}
              value={orderDetail?.address.district.districtName}
            />

            <LabelValue
              labelWidth="210px"
              label={t("order.detail.ward")}
              value={orderDetail?.address.ward.wardName}
            />

            <LabelValue
              labelWidth="210px"
              label={t("order.detail.street")}
              value={orderDetail?.address.street}
            />

            <LabelValue
              labelWidth="210px"
              className="col-span-2"
              label={t("order.detail.note")}
              value={orderDetail?.note}
            />
          </div>

          <div className="text-2xl font-medium mb-3 mt-7">
            {t("order.detail.cartDetail.title")}
          </div>
          <Table headers={headers} rows={rows} isShowPageSize={false} />
        </Form>
      </Formik>
    </div>
  );
};

export default OrderDetail;
