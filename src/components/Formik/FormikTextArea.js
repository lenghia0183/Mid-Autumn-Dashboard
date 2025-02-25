import React from "react";
import { useField } from "formik";
import TextArea from "../TextArea";

const FormikTextArea = ({ id, name, ...props }) => {
  const [field, meta, helpers] = useField(id || name);
  const { setValue, setTouched } = helpers;

  return (
    <>
      <TextArea
        {...props}
        onChange={(val) => setValue(val)}
        onBlur={(e) => {
          setTouched(true);
        }}
        value={field.value}
        error={meta.error && meta.touched ? meta.error : ""}
      />
    </>
  );
};

export default FormikTextArea;
