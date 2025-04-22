import * as Yup from "yup";

export const validateSchema = (t) => {
  return Yup.object().shape({
    name: Yup.string().trim().required(t("validation.required")),
    code: Yup.string().trim().required(t("validation.required")),
    price: Yup.number().required(t("validation.required")),
    costPrice: Yup.number().required(t("validation.required")),
    categoryId: Yup.object()
      .nullable()
      .required(t("validation.required"))
      .test(
        "has-id",
        t("validation.required"),
        (value) => value && value._id !== undefined && value._id !== ""
      ),
    manufacturerId: Yup.object()
      .nullable()
      .required(t("validation.required"))
      .test(
        "has-id",
        t("validation.required"),
        (value) => value && value._id !== undefined && value._id !== ""
      ),
    description: Yup.string().trim().required(t("validation.required")),
  });
};
