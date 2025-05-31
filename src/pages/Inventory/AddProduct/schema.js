import * as Yup from "yup";

export const validateSchema = (t) => {
  return Yup.object().shape({
    reason: Yup.string().trim().required(t("validation.required")),
    quantity: Yup.number().required(t("validation.required")),
    product: Yup.object()
      .nullable()
      .required(t("validation.required"))
      .test(
        "has-id",
        t("validation.required"),
        (value) => value && value._id !== undefined && value._id !== ""
      ),
  });
};
