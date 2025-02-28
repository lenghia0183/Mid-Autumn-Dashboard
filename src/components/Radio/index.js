import React, { useId } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";

const Radio = ({
  name,
  value = "",
  checked = false,
  label = "",
  vertical = false,
  onChange = () => {},
  className = "",
  width = "100%",
  disabled = false,
  hideInput = false,
  labelClassName = "",
  labelWidth = "100px",
  ...props
}) => {
  const id = useId();
  const labelWidthStyle = useResponsiveStyle(labelWidth, "w");
  const verticalRadio = () => {
    return (
      <div
        className={clsx(
          "flex flex-col items-center justify-center",
          className,
          {}
        )}
        style={{ width }}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => !disabled && onChange(value)}
          className={clsx("form-radio h-4 w-4 text-blue-600", {
            "cursor-not-allowed": disabled,
            "cursor-pointer": !disabled,
            hidden: hideInput,
          })}
          id={id}
          disabled={disabled}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            style={{ ...labelWidthStyle }}
            className={clsx("select-none text-center", labelClassName, {
              "ml-2": !vertical,
              "block mt-1": vertical,
              "text-gray-500 cursor-not-allowed": disabled,
              "cursor-pointer": !disabled,
            })}
          >
            {label}
          </label>
        )}
      </div>
    );
  };

  const horizontalRadio = () => {
    return (
      <div
        className={clsx("flex items-center", className, {})}
        style={{ width }}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => !disabled && onChange(value)}
          className={clsx("form-radio h-4 w-4 text-blue-600", {
            "cursor-not-allowed": disabled,
            "cursor-pointer": !disabled,
            hidden: hideInput,
          })}
          id={id}
          disabled={disabled}
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            style={{ ...labelWidthStyle }}
            className={clsx("select-none", labelClassName, {
              "ml-2": !vertical,
              "block mt-1": vertical,
              "text-gray-500 cursor-not-allowed": disabled,
              "cursor-pointer": !disabled,
            })}
          >
            {label}
          </label>
        )}
      </div>
    );
  };
  return vertical ? verticalRadio() : horizontalRadio();
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  label: PropTypes.string,
  vertical: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  hideInput: PropTypes.bool,
};

export default Radio;
