import React from "react";
import { useField } from "formik";
import QuantityInput from "../QuantityInput";

const FormikQuantityInput = ({ id, name, onChange = () => {}, ...props }) => {
  const [field, meta, helpers] = useField(id || name);
  const { setValue, setTouched } = helpers;

  return (
    <QuantityInput
      {...props}
      value={field.value}
      onChange={(val) => {
        setValue(val);
        onChange(val);
      }}
      onBlur={() => setTouched(true)}
      error={meta.touched && meta.error ? meta.error : ""}
    />
  );
};

export default FormikQuantityInput;
