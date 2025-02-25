import { isEmpty, isObject } from "lodash";
import * as Yup from "yup";

const validationSchema = (t) =>
  Yup.object().shape({
    buyerName: Yup.string().required(t("validation.required")),

    buyerEmail: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.required")),

    buyerPhone: Yup.string()
      .matches(/^[0-9]{10,15}$/, t("validation.invalidPhoneNumber"))
      .required(t("validation.required")),

    recipientName: Yup.string().required(t("validation.required")),

    recipientPhone: Yup.string()
      .matches(/^[0-9]{10,15}$/, t("validation.invalidPhoneNumber"))
      .required(t("validation.required")),

    province: Yup.object()
      .nullable()
      .required(t("validation.required"))
      .test("provinceRequired", t("validation.required"), (value) => {
        return isObject(value) && !isEmpty(value);
      }),

    district: Yup.object()
      .nullable()
      .required(t("validation.required"))
      .test("districtRequired", t("validation.required"), (value) => {
        return isObject(value) && !isEmpty(value);
      }),

    ward: Yup.object()
      .nullable()
      .required(t("validation.required"))
      .test("wardRequired", t("validation.required"), (value) => {
        return isObject(value) && !isEmpty(value);
      }),

    street: Yup.string().required(t("validation.required")),

    method: Yup.string()
      .oneOf(["ghtk", "ghn"], t("validation.invalidOption"))
      .required(t("validation.required")),

    paymentMethod: Yup.string().required(t("validation.required")),

    note: Yup.string(),
  });

export default validationSchema;
