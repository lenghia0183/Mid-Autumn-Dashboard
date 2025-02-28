import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useField } from "formik";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";

const RadioGroup = ({
  name,
  children,
  vertical = true,
  className,
  label = "",
  labelWidth = "",
  labelClassName = "",
  required = false,
  errorClassName = "",
}) => {
  const [field, meta, helpers] = useField(name);
  const labelWidthStyle = useResponsiveStyle(labelWidth, "w");
  const error = meta.error ? meta.error : "";
  const enhanceChildren = (children) => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      if (child.type?.name === "FormikRadio") {
        return React.cloneElement(child, {
          name,
        });
      }

      if (child.props?.children) {
        return React.cloneElement(child, {
          children: enhanceChildren(child.props.children),
        });
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
          {enhanceChildren(children)}
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
          {enhanceChildren(children)}
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

RadioGroup.propTypes = {
  name: PropTypes.string,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

export default RadioGroup;
