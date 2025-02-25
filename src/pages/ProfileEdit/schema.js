import * as Yup from "yup";
import { isEmpty, isObject } from "lodash";

const validationSchema = (t) =>
  Yup.object().shape({
    name: Yup.string().required(t("validation.required")),
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.required")),
    phone: Yup.string().required(t("validation.required")),

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
  });

export default validationSchema;
