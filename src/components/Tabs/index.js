import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Tabs = ({
  list,
  children,
  onChange = () => {},
  value: externalValue,
  divider,
  className,
  tabClassName,
}) => {
  const [value, setValue] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({});

  useEffect(() => {
    if (externalValue !== undefined) {
      const index = list.findIndex((item) => item.value === externalValue);
      setValue(index >= 0 ? index : 0);
    }
  }, [externalValue, list]);

  useEffect(() => {
    const tab = document.querySelector(`.tab-${value}`);
    if (tab) {
      const { offsetLeft, offsetWidth } = tab;

      setUnderlineStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [value]);

  const handleChange = (newValue) => {
    setValue(newValue);
    onChange(list[newValue]?.value);
  };

  const renderContent = () => {
    return Array.isArray(children) ? children[value] : children;
  };

  return (
    <div className={clsx("overflow-hidden", className)}>
      <div
        className={`flex ${
          divider ? "border-b" : ""
        } mb-4 relative text-xl overflow-auto`}
      >
        {list.map((item, index) => (
          <button
            key={index}
            onClick={() => handleChange(index)}
            className={`${tabClassName} tab-${index} py-2 px-4 text-nowrap ${
              value === index ? "font-semibold text-emerald" : "text-gray-500"
            } transition-all`}
            type="button"
          >
            {item.label}
            {item.required && <span className="text-red-500 ml-1">*</span>}
          </button>
        ))}
        <span
          className="absolute bottom-0 h-[2px] bg-emerald transition-all"
          style={underlineStyle}
        />
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string,
      required: PropTypes.bool,
    })
  ).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  divider: PropTypes.bool,
  className: PropTypes.string,
  tabClassName: PropTypes.string,
};

export default Tabs;
