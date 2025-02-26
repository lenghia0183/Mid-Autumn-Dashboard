import React, { memo } from "react";
import { useField } from "formik";
import Autocomplete from "../AutoComplete";

const FormikAutocomplete = ({
  name,
  id,
  onChange: externalOnchange,
  onBlur: externalOnBlur,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue, setTouched } = helpers;

  return (
    <>
      <Autocomplete
        {...props}
        onChange={(val) => {
          if (externalOnchange) {
            externalOnchange(val);
          }
          setValue(val);
        }}
        onBlur={(val) => {
          if (externalOnBlur) {
            externalOnBlur(val);
          }
          setTouched(true);
        }}
        name={name}
        value={field.value}
        error={meta.touched && meta.error ? meta.error : ""}
      />
    </>
  );
};

export default memo(FormikAutocomplete);
