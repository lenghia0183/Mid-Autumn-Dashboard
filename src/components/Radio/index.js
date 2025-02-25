import React, { useId } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Radio = ({
  name,
  value = "",
  checked = false,
  label = "",
  orientation = "horizontal",
  onChange = () => {},
  className = "",
  width = "100%",
  disabled = false,
  hideInput = false, // New prop to hide the input
  labelClassName = "",
  ...props
}) => {
  const id = useId();

  return (
    <div
      className={clsx("flex", className, {
        "items-center": orientation === "horizontal",
        "flex-col items-center": orientation === "vertical",
      })}
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
          hidden: hideInput, // Apply hidden class if hideInput is true
        })}
        id={id}
        disabled={disabled}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className={clsx("text-sm select-none", labelClassName, {
            "ml-2": orientation === "horizontal",
            "block mt-2": orientation === "vertical",
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

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  label: PropTypes.string,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  hideInput: PropTypes.bool,
};

export default Radio;
