import React from "react";
import { useField } from "formik";
import RadioGroup from "../RadioGroup";

const FormikRadioGroup = ({ name, onChange, children, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (value) => {
    helpers.setValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <RadioGroup
      {...field}
      name={name}
      selectedValue={field.value}
      onChange={handleChange}
      error={meta.touched && meta.error ? meta.error : ""}
      {...props}
    >
      {children}
    </RadioGroup>
  );
};

export default FormikRadioGroup;
