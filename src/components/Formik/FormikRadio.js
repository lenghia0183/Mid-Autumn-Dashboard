import React from "react";
import { useField } from "formik";
import Radio from "../Radio";

const FormikRadio = ({
  name,
  checked,
  onChange: externalOnChange,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  const handleChange = (value) => {
    setValue(value);
    if (externalOnChange) {
      externalOnChange(value);
    }
  };

  const isChecked =
    checked !== undefined ? checked : field.value === props.value;

  return (
    <Radio
      {...props}
      name={field.name}
      checked={isChecked}
      onChange={handleChange}
      error={meta.error ? meta.error : ""}
    />
  );
};

export default FormikRadio;
