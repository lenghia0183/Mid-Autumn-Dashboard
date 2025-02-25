import * as Yup from "yup";

const validationSchema = (t) => {
  return Yup.object().shape({
    otp: Yup.string()
      .required(t("validation.required"))
      .length(6, t("validation.invalidOTP")),
  });
};

export default validationSchema;
