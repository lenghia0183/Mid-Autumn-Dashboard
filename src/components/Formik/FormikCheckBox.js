import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import CheckBox from "../CheckBox";

const FormikCheckBox = ({
  name = "",
  label,
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

  return (
    <CheckBox
      {...props}
      label={label}
      onChange={handleChange}
      checked={field.value}
      error={meta.touched && meta.error ? meta.error : ""}
    />
  );
};

FormikCheckBox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormikCheckBox;
