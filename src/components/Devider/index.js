import React from "react";
import PropTypes from "prop-types";
import useColorClasses from "../../hooks/useColorClasses";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";
import clsx from "clsx";

const Divider = ({
  orientation = "horizontal",
  color = "dark-200",
  width = "100%",
  height = "1px",
  marginTop = "0",
  marginBottom = "0",
  borderStyle = "solid",
  className,
  ...props
}) => {
  const { borderColor: newBorderColor } = useColorClasses({
    borderColor: color,
  });

  const dimensionStyle = useResponsiveStyle(
    orientation === "horizontal" ? width : height,
    orientation === "horizontal" ? "w" : "h"
  );

  const borderThickness = orientation === "horizontal" ? height : width;

  const style = {
    ...dimensionStyle,
    borderWidth: borderThickness,
    borderStyle: borderStyle,
    marginTop,
    marginBottom,
  };

  return (
    <div className={clsx(className, newBorderColor)} style={style} {...props} />
  );
};

Divider.propTypes = {
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  borderStyle: PropTypes.oneOf(["solid", "dashed", "dotted"]),
  className: PropTypes.string,
};

export default Divider;
