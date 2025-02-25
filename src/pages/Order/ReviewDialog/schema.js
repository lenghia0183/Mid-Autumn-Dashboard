import { isEmpty, isObject } from "lodash";
import * as Yup from "yup";

const validationSchema = (t) =>
  Yup.object().shape({
    rating: Yup.object()
      .nullable()
      .required(t("validation.required"))
      .test("ratingRequired", t("validation.required"), (value) => {
        return isObject(value) && !isEmpty(value);
      }),
    content: Yup.string().required(t("validation.required")),
  });

export default validationSchema;
