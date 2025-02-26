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

  const isChecked = props.checked !== undefined ? props.checked : field.value;

  const handleChange = (value) => {
    if (externalOnChange) {
      externalOnChange(value);
    } else {
      helpers.setValue(value);
    }
  };

  return (
    <CheckBox
      {...props}
      label={label}
      onChange={handleChange}
      checked={isChecked}
      error={meta.touched && meta.error ? meta.error : ""}
    />
  );
};

FormikCheckBox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default FormikCheckBox;
