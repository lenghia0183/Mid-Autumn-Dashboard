import React, { useEffect } from "react";
import clsx from "clsx";
import { useField, useFormikContext } from "formik";
import FormikCheckBox from "../Formik/FormikCheckBox";

const CheckBoxGroup = ({
  name,
  children,
  vertical = true,
  className = "",
  disabled = false,
}) => {
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    if (!Array.isArray(field.value)) {
      helpers.setValue([]);
    }
  }, [field.value, helpers]);

  const error = meta.error ? meta.error : "";

  const handleChange = (checkboxValue, checked) => {
    const currentValue = field.value || [];
    let newValues;
    if (checked) {
      newValues = currentValue.includes(checkboxValue)
        ? currentValue
        : [...currentValue, checkboxValue];
    } else {
      newValues = currentValue.filter((val) => val !== checkboxValue);
    }
    helpers.setValue(newValues);
  };

  const renderChildren = (children) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === FormikCheckBox) {
          const checkboxValue = child.props.value;
          const isChecked = field.value.includes(checkboxValue);
          return React.cloneElement(child, {
            onChange: (checked) => handleChange(checkboxValue, checked),
            disabled: disabled,
            checked: isChecked,
          });
        } else {
          return React.cloneElement(child, {
            children: renderChildren(child.props.children),
          });
        }
      }
      return child;
    });
  };

  return (
    <div>
      <div
        className={clsx(className, {
          "flex flex-col space-y-2": vertical,
          "flex space-x-4": !vertical,
        })}
      >
        {renderChildren(children)}
      </div>
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  );
};

CheckBoxGroup.displayName = "CheckBoxGroup";

export default CheckBoxGroup;
