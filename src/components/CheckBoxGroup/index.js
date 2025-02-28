import React, { useEffect } from "react";
import clsx from "clsx";
import { useField, useFormikContext } from "formik";
import FormikCheckBox from "../Formik/FormikCheckBox";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";

const CheckBoxGroup = ({
  name,
  children,
  vertical = true,
  className = "",
  disabled = false,
  label = "",
  labelWidth = "",
  labelClassName = "",
  required = false,
  errorClassName = "",
}) => {
  const [field, meta, helpers] = useField(name);
  const labelWidthStyle = useResponsiveStyle(labelWidth, "w");

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

  const verticalCheckbox = () => {
    return (
      <div className={clsx("text-lg", className)}>
        <label
          style={{ ...labelWidthStyle }}
          className={clsx("flex items-center", labelClassName)}
        >
          {required && <p className="text-red-500 mr-1">*</p>}
          <p> {label}</p>
        </label>
        <div
          className={clsx({
            "flex flex-col space-y-2 mt-2": vertical,
            "flex space-x-4": !vertical,
          })}
        >
          {renderChildren(children)}
        </div>
        {error && (
          <span className={clsx("text-red-400 text-xs", errorClassName)}>
            {error}
          </span>
        )}
      </div>
    );
  };

  const horizontalCheckbox = () => {
    return (
      <div className={clsx("flex text-lg", className)}>
        <label
          style={{ ...labelWidthStyle }}
          className={clsx("flex items-center", labelClassName)}
        >
          {required && <p className="text-red-500 mr-1">*</p>}
          <p> {label}</p>
        </label>
        <div className={clsx(className, "flex space-x-4 flex-shrink-0 ml-4")}>
          {renderChildren(children)}
        </div>
        {error && (
          <span className={clsx("text-red-400 text-xs", errorClassName)}>
            {error}
          </span>
        )}
      </div>
    );
  };

  return vertical ? verticalCheckbox() : horizontalCheckbox();
};

CheckBoxGroup.displayName = "CheckBoxGroup";

export default CheckBoxGroup;
