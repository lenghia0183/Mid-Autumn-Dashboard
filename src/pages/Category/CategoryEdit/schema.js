import * as Yup from "yup";

export const validateSchema = (t) => {
  return Yup.object().shape({
    name: Yup.string().trim().required(t("validation.required")),
  });
};
