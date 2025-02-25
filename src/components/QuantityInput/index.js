import React from "react";
import clsx from "clsx";
import IconButton from "./../IconButton";

const QuantityInput = ({
  value = 1,
  min = 1,
  max = 100,
  step = 1,
  onChange = () => {},
  error = "",
  className = "",
  inputClassName = "",
  buttonClassName = "",
  disabled = false,
  height = "40px",
  width = "100%",
}) => {
  const handleDecrease = () => {
    if (value > min) onChange(Math.max(min, value - step));
  };

  const handleIncrease = () => {
    if (value < max) onChange(Math.min(max, value + step));
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;

    // Nếu chuỗi rỗng, đặt giá trị là chuỗi rỗng
    if (newValue === "") {
      onChange(""); // Cập nhật giá trị là chuỗi rỗng
      return;
    }

    // Kiểm tra xem đầu vào có phải là số hợp lệ không
    const isNumeric = /^[0-9]*$/.test(newValue);

    if (isNumeric) {
      const parsedValue = parseInt(newValue, 10);

      // Đảm bảo giá trị trong khoảng min và max
      const clampedValue = Math.max(min, Math.min(max, parsedValue));
      onChange(clampedValue);
    }
  };

  const handleBlur = () => {
    if (value === "") {
      onChange(min); // Nếu giá trị là chuỗi rỗng khi mất focus, đặt thành min
    }
  };

  return (
    <div
      className={clsx("flex items-center", className, "w-full")}
      style={{
        width: width,
      }}
    >
      <IconButton
        iconName="minus"
        textColor="emerald"
        className={clsx(
          "border-gray-300 border rounded-sm shrink-0",
          { "hover:border-emerald": !(value <= min) },
          buttonClassName
        )}
        iconWidth="50%"
        iconHeight="50%"
        type="button"
        height={height}
        width={height}
        iconStrokeWidth={30}
        onClick={handleDecrease}
        disabled={disabled || value <= min}
      />

      <input
        type="text"
        value={value}
        onBlur={handleBlur}
        onInput={handleInputChange}
        // onChange={handleInputChange}
        className={clsx(
          "p-2 text-center border border-gray-300 outline-none focus:border-emerald text-dark font-medium",
          inputClassName,
          "flex-grow min-w-0"
        )}
        style={{ height }}
        disabled={disabled}
      />

      <IconButton
        iconName="plus"
        textColor="emerald"
        className={clsx(
          "border-gray-300 border rounded-sm shrink-0",
          { "hover:border-emerald": !(value >= max) },
          buttonClassName
        )}
        type="button"
        iconWidth="50%"
        iconHeight="50%"
        height={height}
        width={height}
        iconStrokeWidth={20}
        onClick={handleIncrease}
        disabled={disabled || value >= max}
      />

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default QuantityInput;
