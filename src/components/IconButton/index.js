import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import useColorClasses from "../../hooks/useColorClasses";
import Loading from "../Loading";
import Icon from "../Icon";
import { Link } from "react-router-dom";

const IconButton = ({
  iconName,
  onClick,
  disabled = false,
  loading = false,
  size = "zeroPadding",
  variant = "text",
  iconSize = 2,
  iconWidth,
  iconHeight,
  iconClass,
  iconStrokeWidth,
  textColor = "",
  iconColor = "",
  textHoverColor = "",
  bgColor = "",
  bgHoverColor = "",
  borderColor,
  className,
  rounded = true,
  width = "",
  height = "",
  to = "",
  href = "",
  type = "button",
  ...props
}) => {
  const baseClasses =
    "rounded-full outline-none transition duration-200 flex items-center justify-center";

  const sizeClasses = {
    small: "px-2 py-2",
    medium: "px-3 py-3",
    large: "px-4 py-4",
    zeroPadding: "p-0",
  };

  const defaultTextContainedColor = "text-white";
  const defaultBgHoverContainedColor = "hover:bg-blue-300";
  const defaultBgContainedColor = "bg-blue-500";

  const defaultIconColor = "text-blue-500";
  const defaultBorderColor = "border-blue-500";
  const defaultBgHoverColor = "hover:bg-blue-200";

  const { textColor: newIconColor } = useColorClasses({ textColor });
  const { textHoverColor: newTextHoverColor } = useColorClasses({
    textHoverColor,
  });

  const { bgHoverColor: newBgHoverColor } = useColorClasses({ bgHoverColor });
  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { borderColor: newBorderColor } = useColorClasses({ borderColor });

  const variantClasses = {
    contained: clsx(
      newIconColor || defaultTextContainedColor,
      newBgColor || defaultBgContainedColor,
      newBgHoverColor || defaultBgHoverContainedColor,
      newTextHoverColor || ""
    ),

    outlined: clsx(
      "border",
      newIconColor || defaultIconColor,
      newBorderColor || defaultBorderColor,
      newBgHoverColor || defaultBgHoverColor
    ),

    text: clsx(
      newIconColor || defaultIconColor,
      newBgHoverColor || "",
      newTextHoverColor || ""
    ),
  };

  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    {
      "opacity-50 cursor-not-allowed": disabled || loading,
      "rounded-full": rounded,
    },
    className
  );

  const ButtonComponent = to ? Link : href ? "a" : "button";

  return (
    <ButtonComponent
      className={classes}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      style={{ width, height }}
      to={to}
      href={href}
      type={type}
      {...props}
    >
      {loading ? (
        <Loading color={textColor || "white"} size="1em" />
      ) : (
        <Icon
          className={iconClass}
          name={iconName}
          size={iconSize}
          width={iconWidth || width}
          height={iconHeight || height}
          color={iconColor}
          strokeWidth={iconStrokeWidth}
        />
      )}
    </ButtonComponent>
  );
};

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large", "zeroPadding"]),
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  iconSize: PropTypes.string,
  iconWidth: PropTypes.string,
  iconHeight: PropTypes.string,
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
  borderColor: PropTypes.string,
  className: PropTypes.string,
  rounded: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default IconButton;
