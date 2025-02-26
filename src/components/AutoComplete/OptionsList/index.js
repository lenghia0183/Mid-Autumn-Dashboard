// OptionsList.js
import React from "react";
import PropTypes from "prop-types";
import useParseDimension from "../../../hooks/useParseDimension";
import Icon from "../../Icon";
import clsx from "clsx";

const OptionsList = ({
  isSelected,
  heightPerOption,
  loading,
  showOptions,
  optionsList,
  row,
  handleOptionSelect,
  getOptionSubLabel,
  getOptionsLabel,
  removeSelectedOption,
  optionsListClassName,
  optionsClassName,
}) => {
  const height = useParseDimension(heightPerOption);

  return (
    <>
      {loading && showOptions ? (
        <div className="absolute z-10 mt-1 bg-white-100 border border-gray-300 rounded-md shadow-lg w-full p-2 text-center">
          Đang tải...
        </div>
      ) : (
        <ul
          className={clsx(
            `absolute z-[1000] mt-1 bg-white-100 border border-gray-300 rounded-sm shadow-md transition-all duration-300 ease-in-out w-full p-y2`,
            optionsListClassName
          )}
          style={{
            height: showOptions
              ? optionsList?.length > 0
                ? `${Math.min(optionsList.length, row) * height.value + 2}${
                    height.unit
                  }`
                : "auto" // Set height to auto if there are no options
              : "0px",
            overflow: showOptions
              ? optionsList?.length > 0
                ? "auto"
                : "hidden"
              : "hidden",
            opacity: showOptions ? "1" : "0", // Keep opacity management the same
          }}
        >
          {optionsList?.length > 0 ? (
            optionsList.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionSelect(option)}
                style={{ height: heightPerOption }}
                className={clsx(
                  "cursor-pointer p-2 flex items-center transition duration-300 hover:text-yellow",
                  {
                    "bg-emerald text-white hover:!text-white":
                      isSelected(option),
                  },
                  {
                    "border-b-2": index !== optionsList.length - 1,
                  },
                  optionsClassName
                )}
              >
                <span
                  className={`flex-1 overflow-hidden whitespace-nowrap text-ellipsis`}
                >
                  {getOptionsLabel(option)}
                </span>
                {getOptionSubLabel(option) && (
                  <span className="option-subLabel text-gray-500 text-sm">
                    {" - "} {getOptionSubLabel(option)}
                  </span>
                )}

                {isSelected(option) && (
                  <Icon
                    name="close"
                    size="1.5em"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelectedOption(option);
                    }}
                  />
                )}
              </li>
            ))
          ) : (
            <li className="p-2 text-center">Không có kết quả phù hợp</li>
          )}
        </ul>
      )}
    </>
  );
};

OptionsList.propTypes = {
  optionsList: PropTypes.array.isRequired,
  isSelected: PropTypes.func.isRequired,
  heightPerOption: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  showOptions: PropTypes.bool.isRequired,
  row: PropTypes.number.isRequired,
  handleOptionSelect: PropTypes.func.isRequired,
  getOptionSubLabel: PropTypes.func.isRequired,
  getOptionsLabel: PropTypes.func.isRequired,
  removeSelectedOption: PropTypes.func.isRequired,
};

export default OptionsList;
