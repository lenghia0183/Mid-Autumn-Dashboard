import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { durationMap } from "../../config/durationConfig";
import useColorClasses from "./../../hooks/useColorClasses";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";
import { useLocation } from "react-router-dom";

const DrawerMenu = ({
  isOpen = false,
  position = "left",
  width = "25%",
  height = "100%",
  renderContent,
  renderTitle = null,
  children,
  animationDuration = 1000,
  disableScroll = true,
  autoCloseTimeout = null,
  handleClose = () => {},
  // handleOpen = () => {},
  overlayColor = "rgba(0, 0, 0, 0.5)",
  bgColor = "white",
  textColor,
  borderColor = "yellow",
  handleOverlayClick,
  className,
}) => {
  const timeoutRef = useRef(null);
  const location = useLocation();

  const widthStyle = useResponsiveStyle(width, "w");
  const heightStyle = useResponsiveStyle(height, "h");

  useEffect(() => {
    handleClose();
    if (handleClose) handleClose();
  }, [location.pathname]);

  useEffect(() => {
    if (disableScroll) {
      document.body.style.overflow = isOpen ? "hidden" : "auto";
    }
  }, [isOpen, disableScroll]);

  useEffect(() => {
    if (autoCloseTimeout) {
      if (isOpen) {
        timeoutRef.current = setTimeout(() => {
          handleClose();
        }, autoCloseTimeout);
      } else {
        clearTimeout(timeoutRef.current);
      }
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isOpen, autoCloseTimeout, handleClose]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
      return;
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [handleClose]);

  const positionStyles = {
    top: {
      classes: "-translate-y-full",
      style: { top: "0", width: "100%", ...heightStyle },
    },
    right: {
      classes: "translate-x-full h-full border",
      style: {
        right: "0",
        top: "0",
        height: "100%",
        borderRight: 0,
        borderTop: 0,
        borderBottom: 0,
        ...widthStyle,
      },
    },
    bottom: {
      classes: "translate-y-full",
      style: { bottom: "0", width: "100%", ...heightStyle },
    },
    left: {
      classes: "-translate-x-full h-full border-r",
      style: {
        left: "0",
        top: "0",
        borderLeft: 0,
        borderTop: 0,
        borderBottom: 0,
        height: "100%",
        ...widthStyle,
      },
    },
  };

  const { bgColor: newBgColor } = useColorClasses({ bgColor });
  const { textColor: newTextColor } = useColorClasses({ textColor });
  const { borderColor: newBorderColor } = useColorClasses({ borderColor });

  const { classes: positionClasses, style: positionStyle } =
    positionStyles[position];

  const drawerClasses = clsx(
    "fixed transition-transform overflow-auto",
    className,
    durationMap[animationDuration],
    newBgColor,
    newTextColor,
    newBorderColor,
    {
      "transform-none": isOpen,
    },
    positionClasses
  );

  const drawerStyle = {
    ...positionStyle,
    zIndex: 100,
  };

  const overlayClasses = clsx(
    "fixed inset-0 transition-opacity",
    durationMap[animationDuration],
    {
      "opacity-0 pointer-events-none": !isOpen,
      "opacity-100 z-[100]": isOpen,
    }
  );

  return (
    <>
      <div
        className={overlayClasses}
        onClick={handleOverlayClick}
        style={{ backgroundColor: overlayColor }}
      />

      <div className={drawerClasses} style={drawerStyle}>
        {renderTitle && <div className="p-4">{renderTitle()}</div>}
        <div>{renderContent()}</div>
      </div>
      <>{children}</>
    </>
  );
};

export default DrawerMenu;
