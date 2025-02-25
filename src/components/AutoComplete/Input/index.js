import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import Icon from "../../Icon";
import Loading from "../../Loading";
import clsx from "clsx";

const Input = forwardRef(
  (
    {
      inputValue,
      handleInputChange,
      clearInput,
      loading,
      showOptions,
      onClick,
      onBlur,
      disabled,
      id,
    },
    inputRef
  ) => {
    return (
      <div
        className={clsx("input-container flex items-center gap-4 h-full ", {
          "bg-gray-100": disabled,
        })}
        onClick={onClick}
      >
        <input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={onBlur}
          ref={inputRef}
          className="border-0 outline-none w-full bg-transparent box-border p-3 h-full"
        />
        <div className="flex items-center gap-x-2 mr-2">
          {loading && <Loading size="25px" color="text-gray-500" />}
          {inputValue && (
            <button
              type="button"
              onClick={clearInput}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-0 m-0 flex item-center"
            >
              <Icon name="close" size={1.8} color="text-gray-500" />
            </button>
          )}
          <Icon
            name="arrowDown"
            size={1.5}
            color="text-gray-500"
            className={`transform transition-transform duration-300 ${
              showOptions ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
    );
  }
);

Input.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  clearInput: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  showOptions: PropTypes.bool.isRequired,
  inputHeight: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default Input;
