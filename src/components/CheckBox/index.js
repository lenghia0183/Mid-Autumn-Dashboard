import React, { useEffect, useState } from "react";
import clsx from "clsx";
import useColorClasses from "../../hooks/useColorClasses";

const CheckBox = ({
  label = "Checkbox",
  checked = false,
  onChange,
  borderWidth = "2px",
  size = "20px",
  className,
  labelClassName,
  borderColor = "dark",
  disabled = false,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const { borderColor: newBorderColor } = useColorClasses({ borderColor });

  return (
    <div
      className={clsx(
        "flex items-center text-lg",
        { "opacity-20 pointer-events-none": disabled },
        className
      )}
    >
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="appearance-none w-0 h-0 opacity-0 invisible display-none"
        />
        <div
          className={clsx("relative", newBorderColor)}
          style={{
            borderWidth,
            width: size,
            height: size,
          }}
        >
          {/* before */}
          <span
            className={clsx("absolute bg-dark transition-transform", {})}
            style={{
              width: `calc(${borderWidth} * 3)`,
              height: borderWidth,
              transform: `rotate(45deg) translate(calc(${borderWidth} / -2), calc(${borderWidth} / -2)) scaleX(${
                isChecked ? 1 : 0
              })`,
              top: "50%",
              left: "20%",
              transformOrigin: "left center",
            }}
          ></span>

          {/* affter */}
          <span
            className={clsx("absolute bg-dark transition-transform", {})}
            style={{
              width: `calc(${borderWidth} * 5)`,
              height: borderWidth,
              transform: `rotate(-45deg) translateY(calc(${borderWidth} * 2)) scaleX(${
                isChecked ? 1 : 0
              })`,
              top: "50%",
              left: "20%",
              transformOrigin: "left center",
            }}
          ></span>
        </div>
        <span className={clsx("ml-2", labelClassName)}>{label}</span>
      </label>
    </div>
  );
};

export default CheckBox;
