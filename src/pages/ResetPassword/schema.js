import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object().shape({
    newPassword: Yup.string()
      .required(t("validation.required"))
      .min(6, t("invalidPassword")),

    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        t("validation.invalidConfirmPassword")
      )
      .required(t("validation.required")),
  });
};

export default validationSchema;
