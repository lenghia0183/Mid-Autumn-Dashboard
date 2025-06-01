import * as Yup from "yup";

export const validateSchema = (t) => {
  return Yup.object().shape({
    _id: Yup.string().required(t("common.validation.required")),
    productId: Yup.object().required(t("common.validation.required")),
    quantity: Yup.number()
      .required(t("common.validation.required"))
      .min(1, t("inventory.validation.quantityMin")),
    reason: Yup.string().required(t("common.validation.required")),
    note: Yup.string(),
  });
};
