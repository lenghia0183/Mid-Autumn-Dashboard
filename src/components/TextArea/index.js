import React, { forwardRef, useId, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";
import Icon from "../Icon"; // Giả sử bạn có một component Icon để render biểu tượng

const TextField = forwardRef(
  (
    {
      value = "",
      placeholder = "",
      type = "text",
      onChange = () => {},
      error = "",
      label = "",
      className = "",
      width = "100%",
      height = "auto",
      labelWidth = "120px",
      allow,
      inputProps,
      inputClassName = "",
      labelClassName = "",
      errorClass = "",
      disabled = false,
      rightIcon = null,
      rightIconClassName = "",
      onFocus = () => {},
      onBlur = () => {},
      required = false,
      rows = 4,
      orientation = "vertical", // or "horizontal"
    },
    inputRef
  ) => {
    const id = useId();
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Trạng thái cho hiển thị mật khẩu

    const widthStyle = useResponsiveStyle(width, "w");
    const heightStyle = useResponsiveStyle(height, "h");
    const labelWidthStyle = useResponsiveStyle(labelWidth, "w");

    const handleChange = (e) => {
      let newValue = e.target.value;
      if (allow instanceof RegExp) {
        newValue = newValue.replace(allow, "");
      }
      onChange(newValue);
    };

    const handleFocus = () => {
      onFocus();
      setIsFocused(true);
    };

    const handleBlur = () => {
      onBlur();
      setIsFocused(false);
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    const renderRightIcon = () => {
      if (type === "password") {
        return (
          <div
            className={clsx(
              "absolute right-0 p-2 inset-y-0 flex items-center cursor-pointer",
              rightIconClassName
            )}
            onClick={togglePasswordVisibility}
          >
            <Icon
              name={showPassword ? "hidePassword" : "showPassword"}
              strokeWidth={0.1}
              size="1.5em"
            />
          </div>
        );
      }

      return (
        rightIcon && (
          <div
            className={clsx(
              "absolute right-0 p-2 inset-y-0 flex items-center",
              rightIconClassName
            )}
          >
            {rightIcon}
          </div>
        )
      );
    };

    const verticalInput = (
      <div className={clsx(className)} style={{ ...widthStyle }}>
        <div className={clsx("relative text-lg")}>
          <label
            htmlFor={id}
            className={clsx(
              "absolute left-2 flex items-center transition-all duration-300 ease-in-out z-[100]",
              labelClassName,
              {
                "text-gray-500": !isFocused && !value,
                "text-dark top-0 -translate-y-full": isFocused || value,
                "top-1": !isFocused && !value,
              }
            )}
          >
            {required && <p className="text-red-500 mr-1">*</p>}
            <p> {label}</p>
          </label>

          <div className={clsx("relative overflow-hidden", inputClassName)}>
            <textarea
              id={id}
              ref={inputRef}
              type={inputType}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              rows={rows}
              className={clsx(
                "w-full border-2 bg-transparent outline-none p-2 ",
                {
                  "cursor-not-allowed bg-gray-200 text-gray-500": disabled,
                  "border-red-500": error,
                  "border-emerald": isFocused || value,
                  "border-gray-300": !isFocused && !value,
                }
              )}
              style={{ ...heightStyle, resize: "none" }}
              {...inputProps}
            />
            {renderRightIcon()}

            {/* underline */}
            {/* {!error && (
              <div
                className={clsx(
                  "w-full absolute bottom-0 left-0 h-[2px] bg-emerald transition-transform duration-300 ease-in-out",
                  {
                    "scale-x-0": !isFocused && !value,
                    "scale-x-100": isFocused || value,
                  }
                )}
              />
            )} */}
          </div>
        </div>

        {error && (
          <div className={clsx("text-red-500 text-sm mt-1", errorClass)}>
            {error}
          </div>
        )}
      </div>
    );

    const horizontalInput = (
      <div>
        <div
          className={clsx(className, "relative flex items-start text-lg h-fit")}
          style={{ ...widthStyle }}
        >
          <label
            htmlFor={id}
            style={{ ...labelWidthStyle }}
            className={clsx("flex items-center", labelClassName)}
          >
            {required && <p className="text-red-500 mr-1">*</p>}
            <p> {label}</p>
          </label>
          <div
            className={clsx(
              "flex-shrink-0 flex-grow relative ml-4",
              { "cursor-not-allowed bg-gray-100 text-gray-500": disabled },
              inputClassName
            )}
          >
            <textarea
              id={id}
              ref={inputRef}
              type={inputType}
              value={value}
              placeholder={placeholder}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              className={clsx(
                "w-full border-2 bg-transparent outline-none p-2",
                {
                  "cursor-not-allowed bg-gray-200 text-gray-500": disabled,
                  "border-red-500": error,
                  "border-emerald": isFocused || value,
                  "border-gray-300": !isFocused && !value,
                }
              )}
              rows={rows}
              style={{ ...heightStyle, resize: "none" }}
              {...inputProps}
            ></textarea>

            {/* underline */}
            {/* {true && (
              <div
                className={clsx(
                  "w-full absolute bottom-0 left-0 h-[2px] bg-emerald transition-transform duration-300 ease-in-out",
                  {
                    "scale-x-100": true,
                  },
                  {
                    "bg-gray-300": disabled,
                  }
                )}
              />
            )} */}

            {renderRightIcon()}
          </div>
        </div>
        {error && (
          <div className={clsx("text-red-500 text-sm mt-1", errorClass)}>
            {error}
          </div>
        )}
      </div>
    );

    return orientation === "vertical" ? verticalInput : horizontalInput;
  }
);

export default TextField;
