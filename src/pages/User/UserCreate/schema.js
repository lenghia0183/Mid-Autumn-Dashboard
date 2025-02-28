import * as Yup from "yup";

export const validateSchema = (t) => {
  return Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t("validation.required"))
      .max(50, t("validation.maxLength", { length: 50 })),

    email: Yup.string()
      .trim()
      .email(t("validation.invalidEmail"))
      .required(t("validation.required")),

    phone: Yup.string()
      .trim()
      .matches(/^[0-9]{10,15}$/, t("validation.invalidPhoneNumber"))
      .required(t("validation.required")),

    password: Yup.string()
      .trim()
      .min(6, t("validation.invalidPassword", { length: 6 }))
      .max(50, t("validation.invalidPassword", { length: 50 }))
      .required(t("validation.required")),

    confirmPassword: Yup.string()
      .required(t("validation.required"))
      .trim()
      .oneOf(
        [Yup.ref("password"), null],
        t("validation.invalidConfirmPassword")
      ),

    isLocked: Yup.boolean().required(t("validation.required")),

    role: Yup.string()
      .oneOf(["admin", "user"], t("validation.invalidRole"))
      .required(t("validation.required")),
  });
};
