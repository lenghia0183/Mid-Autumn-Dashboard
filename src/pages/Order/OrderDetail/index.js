import { Form, Formik } from "formik";
import LabelValue from "./../../../components/LabelValue/index";
import { useNavigate, useParams } from "react-router-dom";
import formatCurrency from "./../../../utils/formatCurrency";
import Button from "../../../components/Button";
import Icon from "../../../components/Icon";
import { PATH } from "../../../constants/path";
import { useTranslation } from "react-i18next";
import {
  useChangeOrderStatus,
  useGetOrderDetail,
} from "../../../service/https/order";
import { ORDER_STATUS, PAYMENT_METHOD } from "../../../constants";
import Table from "../../../components/Table";
import { validateStatus } from "../../../utils/api";
import { toast } from "react-toastify";
import { getOrderStatusColor } from "../OrderList";

const OrderDetail = () => {
  const params = useParams();
  const { data: orderDetail, mutate: refreshOrderDetail } = useGetOrderDetail(
    params.orderId
  );
  const { trigger: updateOrderStatus } = useChangeOrderStatus(params.orderId);
  const { t } = useTranslation();

  // Headers cho bảng chi tiết giỏ hàng
  const headers = [
    t("order.detail.cartDetail.NO"),
    t("order.detail.cartDetail.productId"),
    t("order.detail.cartDetail.productName"),
    t("order.detail.cartDetail.productPrice"),
    t("order.detail.cartDetail.quantity"),
    t("order.detail.cartDetail.totalMoney"),
  ];

  const orderList = orderDetail?.cartDetails || [];
  const rows = orderList.map((order, index) => [
    index + 1,
    <Button
      to={PATH.PRODUCT_DETAIL.replace(":productId", order?.productId._id)}
      size="zeroPadding"
      className="m-auto hover:underline"
      key={order._id}
    >
      {order._id}
    </Button>,
    order?.productId.name,
    formatCurrency(order?.productId.price),
    order?.quantity,
    formatCurrency(order?.totalMoney),
  ]);

  const handleUpdateStatus = (status) => {
    updateOrderStatus(
      { status },
      {
        onSuccess: (res) => {
          if (validateStatus(res.code)) {
            toast.success(t("order.detail.updateSuccess"));
            refreshOrderDetail();
          } else {
            toast.error(res.message);
          }
        },
        onError: (error) => {
          toast.error(t("common.toast.hasErrorTryAgainLater"));
        },
      }
    );
  };

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
          {/* Các nút hành động theo trạng thái */}
          {orderDetail?.status === ORDER_STATUS.PENDING && (
            <>
              <Button
                variant="outlined"
                borderColor="crimson"
                textColor="crimson"
                bgHoverColor="crimson-300"
                startIcon={<Icon name="bin" size={1.5} />}
                onClick={() => handleUpdateStatus(ORDER_STATUS.CANCELED)}
              >
                {t("common.orderAction.cancel")}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Icon name="edit" size={1.5} />}
                onClick={() => handleUpdateStatus(ORDER_STATUS.CONFIRMED)}
              >
                {t("common.orderAction.confirm")}
              </Button>
            </>
          )}

          {orderDetail?.status === ORDER_STATUS.CONFIRMED && (
            <>
              <Button
                variant="outlined"
                borderColor="crimson"
                textColor="crimson"
                bgHoverColor="crimson-300"
                startIcon={<Icon name="bin" size={1.5} />}
                onClick={() => handleUpdateStatus(ORDER_STATUS.CANCELED)}
              >
                {t("common.orderAction.cancel")}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Icon name="edit" size={1.5} />}
                onClick={() => handleUpdateStatus(ORDER_STATUS.SHIPPING)}
              >
                {t("common.orderAction.ship")}
              </Button>
            </>
          )}

          {orderDetail?.status === ORDER_STATUS.SHIPPING && (
            <Button
              variant="outlined"
              startIcon={<Icon name="edit" size={1.5} />}
              onClick={() => handleUpdateStatus(ORDER_STATUS.SUCCESS)}
            >
              {t("common.orderAction.success")}
            </Button>
          )}
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
              value={orderDetail?.address?.province?.provinceName}
            />
            <LabelValue
              labelWidth="210px"
              label={t("order.detail.district")}
              value={orderDetail?.address?.district?.districtName}
            />

            <LabelValue
              labelWidth="210px"
              label={t("order.detail.ward")}
              value={orderDetail?.address?.ward?.wardName}
            />

            <LabelValue
              labelWidth="210px"
              label={t("order.detail.street")}
              value={orderDetail?.address?.street}
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
