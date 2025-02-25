import { Form, Formik } from "formik";

import Breadcrumb from "../../components/Breadcrumb";
import Divider from "../../components/Devider";
import Icon from "../../components/Icon";
import { PAGE_TITLE, PATH } from "../../constants/path";
import FormikTextField from "./../../components/Formik/FormikTextField";
import FormikAutocomplete from "./../../components/Formik/FormikAutoComplete";
import FormikTextArea from "./../../components/Formik/FormikTextArea";
import Button from "./../../components/Button/index";
import IconButton from "./../../components/IconButton/index";
import Image from "../../components/Image";
import images from "../../asset/images";
import formatCurrency from "./../../utils/formatCurrency";
import LabelValue from "./../../components/LabelValue/index";
import FormikRadio from "./../../components/Formik/FormikRadio";
import FormikRadioGroup from "../../components/Formik/FormikRadioGroup";
import {
  getDistrictDataTest,
  getProvinceDataTest,
  getShipPriceTest,
  getWardDataTest,
} from "../../service/GHNApi";
import { useEffect, useRef, useState } from "react";
import validationSchema from "./schema";
import { useTranslation } from "react-i18next";
import { TEXTFIELD_ALLOW } from "../../constants";

import { useAddOrder } from "../../service/https/checkout";
import { validateStatus } from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useCart, useUser } from "../../context";

function Checkout() {
  const { t } = useTranslation();
  // const isLargerThanSm = useBreakpoint("sm");
  const formRef = useRef();

  const [values, setValues] = useState({});
  const { trigger: addOrder } = useAddOrder();
  const { user: data } = useUser();

  const [userData, setUserData] = useState(data);

  useEffect(() => {
    setUserData(data.user);
  }, [data]);

  const navigate = useNavigate();

  const breadcrumbCheckout = [
    {
      to: PATH.HOME,
      label: PAGE_TITLE.HOME,
    },
    {
      to: PATH.CHECKOUT,
      label: PAGE_TITLE.CHECKOUT,
    },
  ];

  const { cartData, refreshCart } = useCart();

  const items = cartData?.cartDetails || [];
  const initialValues = {
    buyerName: userData?.fullname || "",
    buyerEmail: userData?.email || "",
    buyerPhone: userData?.phone || "",
    recipientName: "",
    recipientPhone: "",
    province: null,
    district: null,
    ward: null,
    street: "",
    shippingFee: null,
    itemTotalPrice: cartData?.cartTotalMoney || 0,
    total: 0,
    method: "ghn",
    note: "",
  };

  useEffect(() => {
    const {
      province = "",
      district = "",
      ward = "",
    } = formRef?.current?.values;

    const { setFieldValue } = formRef?.current;

    if (province && district && ward) {
      const fetchServicePrice = async () => {
        const servicePrice = await getShipPriceTest({
          service_type_id: 2,
          to_district_id: district?.DistrictID,
          to_ward_code: ward?.WardCode,
          insurance_value: items?.reduce((total, item) => {
            return total + item.quantity * item.price;
          }, 0),
          weight: items?.reduce((total, item) => {
            return total + item.quantity * 700;
          }, 0),
          items: items?.map((i) => {
            return {
              name: i?.name,
              quantity: i?.quantity,
              height: 30,
              weight: 700,
              width: 30,
              length: 30,
            };
          }),
        });

        if (servicePrice && servicePrice.data) {
          setFieldValue("shippingFee", servicePrice.data.total);
        }
      };

      fetchServicePrice();
    }
  }, [values?.province, values?.district, values?.ward]);

  const handleCopyInfo = (setFieldValue, values) => {
    setFieldValue("recipientName", values?.buyerName);
    setFieldValue("recipientPhone", values?.buyerPhone);
  };

  return (
    <>
      <main className="bg-white">
        <Breadcrumb items={breadcrumbCheckout} />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema(t)}
          innerRef={(f) => {
            formRef.current = f;
            setValues(f?.values);
          }}
          onSubmit={(values) => {
            // Handle form submission
            // console.log("Submitted values", values);
            const convertValue = {
              cartId: cartData?.id,
              buyerName: values?.buyerName,
              buyerEmail: values?.buyerEmail,
              buyerPhone: values?.buyerPhone,
              recipientName: values?.recipientName,
              recipientPhone: values?.recipientPhone,
              shippingFee: values?.shippingFee,
              paymentMethod: values?.paymentMethod === "COD" ? "COD" : "Bank",
              paymentGateway:
                values?.paymentMethod !== "COD" ? values?.paymentMethod : "",
              address: {
                province: {
                  provinceId: values?.province?.ProvinceID,
                  provinceName: values?.province?.ProvinceName,
                },
                district: {
                  districtId: values?.district?.DistrictID,
                  districtName: values?.district?.DistrictName,
                },
                ward: {
                  wardCode: values?.ward?.WardCode,
                  wardName: values?.ward?.WardName,
                },
                street: values?.street,
              },
              note: values?.note,
            };

            addOrder(convertValue, {
              onSuccess: (response) => {
                if (validateStatus(response?.code)) {
                  toast.success(response?.message);
                  window.open(response?.data?.payUrl, "_blank");
                  refreshCart();
                  navigate(PATH.HOME);
                } else {
                  toast.success(response?.message);
                  navigate(PATH.HOME);
                }
              },
              onError: () => {
                toast.success(t("common.hasErrorTryAgainLater"));
              },
            });
          }}
        >
          {({ resetForm, values, errors, setFieldValue }) => {
            return (
              <Form>
                <div className="container my-14 bg-white-100">
                  <h2 className="text-dark text-[35px] font-semibold text-center p-5">
                    {t("checkout.title")}
                  </h2>
                  <Divider marginBottom="20px" color="dark-300" />

                  <div className="grid grid-cols-12 gap-1">
                    {/* left column */}
                    <div className="xl:col-span-7 col-span-full p-5">
                      <p className="flex items-center gap-2 text-xl font-semibold text-dark">
                        <Icon name="locationEmpty" size="1.3em" color="dark" />
                        <p>{t("checkout.userInfo")}</p>
                      </p>

                      <div className="shadow-lg p-4">
                        <p className=" text-xl font-medium text-dark">
                          {t("checkout.buyer")}
                        </p>

                        {/* Thông tin người mua hàng */}
                        <div className="grid grid-cols-12 gap-7 gap-y-11 mt-10 ">
                          <FormikTextField
                            className="sm:col-span-6 col-span-full"
                            name="buyerName"
                            label={t("checkout.name")}
                            required
                          />

                          <FormikTextField
                            className="sm:col-span-6 col-span-full"
                            name="buyerEmail"
                            label={t("checkout.email")}
                            required
                          />

                          <FormikTextField
                            className="sm:col-span-6 col-span-full"
                            name="buyerPhone"
                            label={t("checkout.phone")}
                            allow={TEXTFIELD_ALLOW.NUMERIC}
                            required
                          />
                        </div>

                        <div>
                          <p className="text-dark text-xl font-medium mt-14">
                            {t("checkout.recipient")}
                          </p>
                          {/* Thông tin người nhận hàng */}
                          <div className="grid grid-cols-12 gap-7 gap-y-11 mt-10 ">
                            <FormikTextField
                              className="sm:col-span-6 col-span-full"
                              name="recipientName"
                              label={t("checkout.name")}
                              required
                            />

                            <FormikTextField
                              className="sm:col-span-6 col-span-full"
                              name="recipientPhone"
                              label={t("checkout.phone")}
                              allow={TEXTFIELD_ALLOW.NUMERIC}
                              required
                            />

                            <Button
                              type="button"
                              variant="text"
                              textColor="dark"
                              textHoverColor="yellow"
                              bgHoverColor="transparent"
                              className="-mt-4 col-span-12"
                              size="zeroPadding"
                              startIcon={<Icon name="copy" size="1em" />}
                              onClick={() => {
                                handleCopyInfo(setFieldValue, values);
                              }}
                            >
                              {t("checkout.useBuyerInfo")}
                            </Button>
                          </div>
                        </div>

                        {/* Địa chỉ và phương thức giao hàng*/}
                        <div className="grid grid-cols-12 gap-7 gap-y-11 sm:mt-10 mt-6">
                          {/* Địa chi  */}
                          <div className="md:col-span-6 col-span-full flex flex-col gap-y-12">
                            <p className="text-dark text-xl font-medium">
                              {t("checkout.shippingAddress")}
                            </p>
                            <FormikAutocomplete
                              name="province"
                              label={t("checkout.province")}
                              asyncRequest={getProvinceDataTest}
                              asyncRequestHelper={(res) => {
                                return res?.data;
                              }}
                              getOptionsLabel={(opt) => opt?.ProvinceName}
                              isEqualValue={(opt, val) =>
                                opt?.ProvinceID === val?.ProvinceID
                              }
                              onChange={() => {
                                setFieldValue("district", null);
                                setFieldValue("ward", null);
                                setFieldValue("shippingFee", null);
                              }}
                              autoFetch={false}
                              filterActive={true}
                              required
                            />

                            <FormikAutocomplete
                              name="district"
                              label={t("checkout.district")}
                              asyncRequest={() => {
                                return getDistrictDataTest(
                                  values?.province?.ProvinceID
                                );
                              }}
                              asyncRequestHelper={(res) => {
                                return res?.data;
                              }}
                              getOptionsLabel={(opt) => {
                                return opt?.DistrictName;
                              }}
                              isEqualValue={(opt, val) =>
                                opt?.DistrictID === val?.DistrictID
                              }
                              onChange={() => {
                                setFieldValue("ward", null);
                                setFieldValue("shippingFee", null);
                              }}
                              disabled={!values?.province}
                              asyncRequestDeps="province"
                              autoFetch={false}
                              filterActive={true}
                              required
                            />

                            <FormikAutocomplete
                              name="ward"
                              label={t("checkout.ward")}
                              asyncRequest={() => {
                                return getWardDataTest(
                                  values?.district?.DistrictID
                                );
                              }}
                              asyncRequestHelper={(res) => {
                                return res?.data;
                              }}
                              getOptionsLabel={(opt) => {
                                return opt?.WardName;
                              }}
                              isEqualValue={(opt, val) =>
                                opt?.WardCode === val?.WardCode
                              }
                              onChange={() => {
                                setFieldValue("shippingFee", null);
                              }}
                              autoFetch={false}
                              disabled={!values?.district}
                              asyncRequestDeps="district"
                              filterActive={true}
                              required
                            />

                            <FormikTextArea
                              className="sm:hidden block"
                              name="street"
                              label={t("checkout.street")}
                              required
                            />
                          </div>

                          {/* Đơn vị giao hàng */}
                          <div className="md:col-span-6 col-span-full flex flex-col">
                            <p className="text-dark text-xl font-medium mt-0">
                              {t("checkout.shippingCompany")}
                            </p>

                            <FormikRadioGroup
                              name="method"
                              className="flex flex-col"
                            >
                              <FormikRadio
                                value="ghn"
                                hideInput={true}
                                label={
                                  <div className="flex items-center border border-gray-400 border-dashed p-4 text-base mt-4">
                                    <div>
                                      <Image
                                        src={images.logoGHN}
                                        height="40px"
                                        width="fit-content"
                                        objectFit="contain"
                                      />
                                      <p>
                                        {t("checkout.shippingFee")} -{" "}
                                        <span className="font-semibold">
                                          {formatCurrency(values?.shippingFee)}
                                        </span>
                                      </p>
                                      <p className="text-crimson font-medium">
                                        {t("checkout.freeShip")}
                                      </p>
                                    </div>
                                    <FormikRadio
                                      checked={values?.method === "ghn"}
                                      width="fit-content"
                                    />
                                  </div>
                                }
                              />
                            </FormikRadioGroup>
                          </div>

                          <FormikTextArea
                            className="col-span-12 hidden sm:block"
                            name="street"
                            label={t("checkout.street")}
                            required
                          />
                        </div>
                      </div>

                      <p className="flex items-center gap-2 text-xl font-semibold text-dark mt-10">
                        <Icon name="paymentMethod" size="1.5em" color="dark" />
                        <p>{t("checkout.paymentMethod")}</p>
                      </p>

                      <div className="grid grid-cols-12 gap-5 items-start mt-6 shadow-lg px-4 pb-10 rounded-sm">
                        <FormikRadio
                          className="xl:col-span-6 col-span-full"
                          value="COD"
                          name="paymentMethod"
                          labelClassName="w-full"
                          label={
                            <div className="w-full flex items-center gap-2 bg-emerald-500 pr-3 text-lg font-semibold text-white rounded-sm ">
                              <Image src={images.codMethod} width="60px" />
                              <p>{t("checkout.cod")}</p>
                            </div>
                          }
                        />

                        <div className="xl:col-span-6 col-span-full">
                          <div className="w-full flex items-center gap-2 bg-blue-400 pr-3 text-lg font-semibold text-white  rounded-sm ">
                            <Image src={images.bankingMethod} width="60px" />
                            <p>{t("checkout.online")}</p>
                          </div>

                          <div className="flex flex-col bg-gray-100 px-4 mt-5">
                            <FormikRadio
                              name="paymentMethod"
                              value="MoMo"
                              labelClassName="w-full"
                              label={
                                <div>
                                  <div className="flex items-center justify-between py-4 text-lg font-medium text-dark ">
                                    <Image
                                      src={images.logoMomo}
                                      width="auto"
                                      height="30px"
                                    />
                                    <p className="">{t("checkout.momo")}</p>
                                  </div>
                                  <Divider />
                                </div>
                              }
                            />

                            <FormikRadio
                              name="paymentMethod"
                              value="ZaloPay"
                              labelClassName="w-full"
                              label={
                                <div className="flex items-center justify-between py-4 text-lg font-medium text-dark ">
                                  <Image
                                    src={images.logoZaloPay}
                                    width="auto"
                                    height="30px"
                                  />
                                  <p className="">{t("checkout.zalo")}</p>
                                </div>
                              }
                            />
                          </div>
                        </div>

                        {errors?.paymentMethod && (
                          <p className="col-span-12 text-red-500 text-sm mt-1">
                            {errors?.paymentMethod}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* right column */}
                    <div className="xl:col-span-5 col-span-full shadow-md p-5 h-fit">
                      {/* title */}
                      <div className="flex justify-between">
                        <p className="flex items-center gap-2 text-xl font-semibold text-dark">
                          <Icon name="cart" size="1.3em" color="dark" />
                          <p>{t("checkout.orderInfo")}</p>
                        </p>

                        <IconButton
                          iconName="edit"
                          textColor="dark"
                          textHoverColor="yellow"
                          to={PATH.CART}
                        />
                      </div>

                      {/* items */}
                      <div className="mt-4 max-h-[500px] overflow-auto p-2 border border-gray-300 rounded-sm">
                        {items?.map((item) => {
                          return (
                            <div>
                              <div className="flex justify-between items-start py-3">
                                <Image
                                  src={item?.productId?.images[0]}
                                  width="70px"
                                  height="70px"
                                />
                                <p className="w-1/2 text-lg font-medium text-left text-dark">
                                  {item?.productId?.name}
                                </p>
                                <p className="text-lg text-crimson">
                                  {item?.quantity} x
                                </p>
                                <p className="text-lg text-crimson">
                                  {formatCurrency(item?.productId?.price)}
                                </p>
                              </div>
                              <Divider color="dark-200" borderStyle="dashed" />
                            </div>
                          );
                        })}
                      </div>

                      {/* money info */}
                      <div className="bg-gray-100 px-4 py-6 mt-10">
                        <div>
                          <LabelValue
                            label={t("checkout.totalOrder")}
                            value={formatCurrency(cartData?.cartTotalMoney)}
                            className="justify-between"
                            labelClassName="text-xl !font-normal text-gray-500"
                            valueClassName="text-2xl !font-normal text-crimson"
                          />
                          <Divider
                            marginTop="10px"
                            marginBottom="10px"
                            color="dark-200"
                          />
                        </div>

                        <div>
                          <LabelValue
                            label={t("checkout.totalShippingFee")}
                            value={formatCurrency(values?.shippingFee)}
                            className="justify-between"
                            labelClassName="text-xl !font-normal text-gray-500"
                            valueClassName="text-2xl !font-normal text-crimson"
                          />
                          <Divider
                            marginTop="10px"
                            marginBottom="10px"
                            color="dark-200"
                          />
                        </div>

                        <div>
                          <LabelValue
                            label={t("checkout.tempFee")}
                            value={formatCurrency(
                              values?.shippingFee + cartData?.cartTotalMoney
                            )}
                            className="justify-between"
                            labelClassName="text-xl !font-normal text-gray-500"
                            valueClassName="text-2xl !font-normal text-crimson"
                          />
                          <Divider
                            marginTop="10px"
                            marginBottom="10px"
                            color="dark-200"
                          />
                        </div>

                        <div>
                          <LabelValue
                            label={t("checkout.totalPayment")}
                            value={formatCurrency(
                              values?.shippingFee + cartData?.cartTotalMoney
                            )}
                            className="justify-between"
                            labelClassName="text-xl"
                            valueClassName="text-2xl !font-semibold text-crimson"
                          />
                        </div>
                      </div>

                      <FormikTextArea
                        name="note"
                        label="Ghi chú"
                        className="mt-10"
                      />

                      <Button
                        type="submit"
                        full
                        size="large"
                        className="text-xl mt-5 "
                      >
                        {t("common.checkout")}
                      </Button>

                      <Button
                        type="button"
                        full
                        size="large"
                        className="text-xl mt-3"
                        bgColor="gray-400"
                        onClick={() => {
                          resetForm();
                        }}
                      >
                        {t("common.cancel")}
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </main>
    </>
  );
}

export default Checkout;
