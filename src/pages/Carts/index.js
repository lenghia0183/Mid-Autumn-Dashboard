import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Divider from "../../components/Devider";
import { PAGE_TITLE, PATH } from "../../constants/path";
import IconButton from "../../components/IconButton";
import Image from "../../components/Image";
import LabelValue from "../../components/LabelValue";
import formatCurrency from "../../utils/formatCurrency";
import Button from "../../components/Button";
import Dialog from "../../components/Diaglog";
import useBreakpoint from "../../hooks/useBreakpoint";
import { toast } from "react-toastify";
import { validateStatus } from "../../utils/api";
import QuantityInput from "../../components/QuantityInput";
import { useCart } from "../../context";
import { useTranslation } from "react-i18next";

function Cart() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCartDetail, setSelectedCartDetail] = useState(null);
  const isLargerThanSm = useBreakpoint("sm");
  const { t } = useTranslation();
  const {
    cartData,
    updateCartDetail,
    deleteCartDetail,
    refreshCart,
    isLoading,
  } = useCart();
  const myCart = cartData || [];

  const breadcrumbCart = [
    { label: PAGE_TITLE.HOME, to: PATH.HOME },
    { label: PAGE_TITLE.CART, to: PATH.CART },
  ];

  const handleOpenDialog = (cartDetail) => {
    setSelectedCartDetail(cartDetail);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCartDetail(null);
  };

  const handleConfirmDelete = () => {
    deleteCartDetail(
      { cartDetailId: selectedCartDetail?._id, cartId: myCart.id },
      {
        onSuccess: (response) => {
          if (validateStatus(response?.code)) {
            toast.success(response?.message);
            handleCloseDialog();
            refreshCart();
          } else {
            toast.error(response?.message);
          }
        },
        onError: () => {
          toast.error(t("common.hasErrorTryAgainLater"));
        },
      }
    );
  };

  const handleUpdateQuantity = (quantity, item) => {
    updateCartDetail(
      {
        cartDetailId: item?._id,
        cartId: myCart.id,
        quantity: quantity,
      },
      {
        onSuccess: (response) => {
          if (validateStatus(response?.code)) {
            toast.success(response?.message);
          } else {
            toast.error(response?.message);
          }
        },
        onError: () => {
          toast.error(t("common.hasErrorTryAgainLater"));
        },
      }
    );
  };

  return (
    <>
      <Breadcrumb items={breadcrumbCart} />
      <div className="bg-white py-14">
        <div className="container bg-white-100 py-4 rounded-md shadow-md">
          <h3 className="text-emerald text-[28px] font-semibold">
            {t(PAGE_TITLE.CART)}
          </h3>
          <Divider marginTop="10px" color="dark" />

          <div>
            {isLoading ? (
              <SkeletonCart />
            ) : myCart?.cartDetails && myCart?.cartDetails.length > 0 ? (
              myCart?.cartDetails.map((item, index) => (
                <div key={index} className="py-4 border-b border-gray-200">
                  <div className="grid grid-cols-12 items-center gap-4">
                    {/* Cột hình ảnh và tên sản phẩm */}
                    <div className="col-span-5 flex items-center gap-4">
                      <Image src={item?.productId?.images[0]} width="80px" />
                      <h2 className="text-lg text-dark font-medium">
                        {item?.productId?.name?.toUpperCase()}
                      </h2>
                    </div>

                    {/* Cột đơn giá, số lượng, thành tiền */}
                    <div className="col-span-5 flex flex-col gap-y-2">
                      <LabelValue
                        label="Đơn giá"
                        value={formatCurrency(item?.productId?.price)}
                      />
                      <LabelValue
                        label="Số lượng"
                        value={
                          <QuantityInput
                            value={item?.quantity}
                            onChange={(quantity) =>
                              handleUpdateQuantity(quantity, item)
                            }
                            max={20}
                          />
                        }
                      />
                      <LabelValue
                        label="Thành tiền"
                        valueClassName="text-emerald text-xl font-medium"
                        value={formatCurrency(item?.totalMoney)}
                      />
                    </div>

                    {/* Cột nút xóa */}
                    <div className="col-span-2 flex justify-end">
                      <IconButton
                        iconName="bin"
                        textColor="gray-500"
                        className="hover:text-red-500"
                        onClick={() => handleOpenDialog(item)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">{t("cart.empty")}</p>
            )}

            <div className="flex flex-col items-end mt-4">
              <LabelValue
                label={t("cart.total")}
                labelWidth="150px"
                value={formatCurrency(myCart?.cartTotalMoney)}
                className="!text-2xl font-semibold"
                valueClassName="text-emerald"
              />

              <div className="flex gap-4 mt-5">
                <Button
                  bgColor="yellow"
                  bgHoverColor="emerald"
                  textHoverColor="white"
                  textColor="dark"
                  size={isLargerThanSm ? "large" : "medium"}
                  to={PATH.PRODUCTS}
                >
                  {t("common.showMoreItem").toUpperCase()}
                </Button>
                <Button
                  size={isLargerThanSm ? "large" : "medium"}
                  bgColor="emerald"
                  textColor="white"
                  bgHoverColor="yellow"
                  textHoverColor="dark"
                  to={PATH.CHECKOUT}
                >
                  {t("common.checkout").toUpperCase()}
                </Button>
              </div>
            </div>
          </div>
          {/* <SkeletonCart /> */}
        </div>
      </div>

      <Dialog
        open={openDialog}
        onCancel={handleCloseDialog}
        onSubmit={handleConfirmDelete}
        submitLabel={t("cart.dialog.submitLabel")}
        cancelLabel={t("cart.dialog.cancelLabel")}
        title={t("cart.dialog.title")}
        titleProps="text-lg font-semibold"
      >
        <p>{t("cart.dialog.desc")}</p>
      </Dialog>
    </>
  );
}

// Component Skeleton
function SkeletonCart() {
  return (
    <div className="space-y-4">
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-12 items-center gap-4 p-4 bg-gray-100 rounded-md"
        >
          <div className="col-span-5 h-20 flex gap-5 items-center">
            <div className=" bg-gray-300 animate-pulse w-[80px] h-[80px]"></div>
            <div className=" bg-gray-300 animate-pulse w-[80%] h-[40px]"></div>
          </div>
          <div className="col-span-5 space-y-2">
            <div className="h-6 bg-gray-300 animate-pulse w-1/3"></div>
            <div className="h-6 bg-gray-300 animate-pulse w-1/2"></div>
            <div className="h-6 bg-gray-300 animate-pulse w-1/3"></div>
          </div>
          <div className="col-span-2 h-6 bg-gray-300 animate-pulse w-10"></div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
