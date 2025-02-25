import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Loading from "../Loading";
import useColorClasses from "../../hooks/useColorClasses";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Button = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  size = "medium",
  variant = "contained",
  textColor = "",
  textHoverColor = "",
  bgColor = "",
  bgHoverColor = "",
  startIcon,
  endIcon,
  borderColor,
  borderHoverColor,
  className,
  iconClassName = "",
  width,
  rounded,
  full,
  height,
  href,
  type = "button",
  to,
  ...props
}) => {
  const { t } = useTranslation();

  const isLink = Boolean(to || href);

  const baseClasses =
    "rounded focus:outline-none transition duration-300 flex w-fit items-center justify-center cursor-pointer font-medium";

  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-5 py-2 text-base",
    large: "px-7 py-3 text-lg",
    zeroPadding: "p-0",
  };

  const defaultTextContainedColor = isLink ? "text-blue" : "text-white";
  const defaultBgContainedColor = isLink ? "" : "bg-emerald";
  const defaultBgHoverContainedColor = isLink ? "" : "hover:bg-yellow";
  const defaultTextHoverContainedColor = isLink ? "" : "hover:text-dark";

  const defaultTextColor = "text-blue-500";
  const defaultBorderColor = "border-blue-500";
  const defaultBgHoverColor = "hover:bg-blue-200";
  const defaultTextHoverColor = "hover:white";

  const defaultLinkColor = "text-blue-500";

  const { textColor: newTextColor } = useColorClasses({ textColor });
  const { bgHoverColor: newBgHoverColor } = useColorClasses({ bgHoverColor });
  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { borderColor: newBorderColor } = useColorClasses({ borderColor });
  const { textHoverColor: newTextHoverColor } = useColorClasses({
    textHoverColor,
  });

  const { borderHoverColor: newBorderHoverColor } = useColorClasses({
    borderHoverColor,
  });

  const variantClasses = {
    contained: clsx(
      newTextColor || defaultTextContainedColor,
      newBgColor || defaultBgContainedColor,
      newBgHoverColor || defaultBgHoverContainedColor,
      newTextHoverColor || defaultTextHoverContainedColor
    ),

    outlined: clsx(
      "border",
      newTextColor || defaultTextColor,
      newBorderColor || defaultBorderColor,
      newBgHoverColor || defaultBgHoverColor,
      newTextHoverColor || defaultTextHoverColor,
      newBorderHoverColor || ""
    ),

    text: clsx(
      "hover:underline",
      newTextColor || defaultTextColor,
      newBgHoverColor || defaultBgHoverColor,
      newTextHoverColor || ""
    ),
  };

  const linkClass = clsx(
    // "hover:underline",
    newTextColor || defaultLinkColor,
    newBgHoverColor || "",
    newBorderColor || "",
    newBorderHoverColor || "",
    newBgColor || "",
    newTextHoverColor || ""
  );

  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    {
      [variantClasses[variant]]: variant,
      [linkClass]: isLink,
      "opacity-50 cursor-not-allowed": disabled || loading,
      "rounded-full": rounded,
      "w-full": full,
    },
    className
  );

  const ButtonComponent = to ? Link : href ? "a" : "button";

  const content = () => (
    <>
      {loading ? (
        <>
          <Loading color={textColor || "white"} size="1em" />
          <span className="ml-2">{t("common.loading")}</span>
        </>
      ) : (
        <>
          {startIcon && (
            <span
              className={clsx(
                "mr-2 flex items-center text-inherit",
                iconClassName
              )}
            >
              {startIcon}
            </span>
          )}
          <span className={clsx("text-inherit", { iconClassName })}>
            {children}
          </span>
          {endIcon && <span className="ml-2 flex items-center">{endIcon}</span>}
        </>
      )}
    </>
  );

  return (
    <ButtonComponent
      className={clsx(classes)}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      style={{ width, height }}
      to={to}
      href={href}
      type={type}
      {...props}
    >
      {content()}
    </ButtonComponent>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large", "zeroPadding"]),
  variant: PropTypes.oneOf(["contained", "outlined", "text"]),
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  className: PropTypes.string,
};

export default Button;
