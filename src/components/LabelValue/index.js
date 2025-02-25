import React from "react";
import clsx from "clsx";

const LabelValue = ({
  label,
  value,
  labelWidth = "auto",
  labelClassName = "",
  valueClassName = "",
  className = "",
}) => {
  return (
    <div className={clsx("flex items-start text-lg text-dark", className)}>
      <div
        className={clsx("font-semibold flex-shrink-0", labelClassName)}
        style={{ width: labelWidth }}
      >
        {label}
      </div>
      <div className={clsx("ml-2", valueClassName)}>{value}</div>
    </div>
  );
};

export default LabelValue;
