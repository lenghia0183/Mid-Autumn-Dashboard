import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object({
    currentPassword: Yup.string().required(
      t("changePassword.errors.currentPasswordRequired")
    ),
    newPassword: Yup.string()
      .min(6, t("changePassword.errors.newPasswordMin"))
      .required(t("changePassword.errors.newPasswordRequired")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        t("changePassword.errors.confirmPasswordMismatch")
      )
      .required(t("changePassword.errors.confirmPasswordRequired")),
  });
};

export default validationSchema;
