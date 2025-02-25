import React, { useId } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

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
  ...props
}) => {
  const id = useId();

  return (
    <div
      className={clsx("flex", className, {
        "items-center": !vertical,
        "flex-col items-center": vertical,
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
          hidden: hideInput,
        })}
        id={id}
        disabled={disabled}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
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
