import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object().shape({
    email: Yup.string()
      .email(t("validation.invalidEmail"))
      .required(t("validation.required")),
  });
};

export default validationSchema;
