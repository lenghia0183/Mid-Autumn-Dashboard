import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object().shape({
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.required")),
    password: Yup.string()
      .required(t("validation.required"))
      .min(6, t("invalidPassword")),
  });
};

export default validationSchema;
