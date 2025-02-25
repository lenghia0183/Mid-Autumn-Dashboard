import React, { useState, useEffect, useRef, useId, memo } from "react";
import PropTypes from "prop-types";
import useDebounce from "../../hooks/useDebouce";
import Input from "./Input";
import OptionsList from "./OptionsList";
import SelectedTags from "./SelectedTags";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";
import clsx from "clsx";
import { useFormikContext } from "formik";

const Autocomplete = ({
  options = [],
  asyncRequest = null,
  getOptionsLabel = (option) => option?.label,
  getOptionSubLabel = () => null,
  isEqualValue = (val, opt) => val?.id === opt?.id,
  isCloseAfterSelect = true,
  asyncRequestHelper = (res) => res,
  multiple = false,
  width = "100%",
  heightPerOption = "50px",
  row = 5,
  className = "",
  autoFetch = true,
  height = "50px",
  onChange = () => {},
  onBlur = () => {},
  error = "",
  label = "",
  labelWidth = "120px",
  labelClassName = "",
  optionsListClassName = "",
  optionsClassName = "",
  orientation = "vertical",
  asyncRequestDeps = "",
  errorClass,
  filterActive = false,
  value,
  name,
  disabled,
  required,
}) => {
  const { values } = useFormikContext();

  // console.log("fomikcontext values", values);
  // console.log("values of dependencies", values[asyncRequestDeps]);

  const [optionsState, setOptions] = useState(options);
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 500);
  // eslint-disable-next-line no-unused-vars
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState(multiple ? [] : value);
  const [showOptions, setShowOptions] = useState(false);
  const [isUserInput, setIsUserInput] = useState(false);
  const inputContainerRef = useRef(null);
  const inputRef = useRef(null);

  const labelRef = useRef();
  const id = useId();

  const heightStyle = useResponsiveStyle(height, "h");
  const widthStyle = useResponsiveStyle(width, "w");

  useEffect(() => {
    if (options?.length > 0) {
      setOptions(options);
    }
  }, [options]);

  const fetchData = async () => {
    if (!asyncRequest) return;

    setLoading(true);
    const result = await asyncRequest(inputValue);
    const transformedData = asyncRequestHelper(result);
    setOptions(transformedData);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      if (asyncRequestDeps && values[asyncRequestDeps]) {
        fetchData();
      } else if (!asyncRequestDeps) {
        fetchData();
      }
    }
  }, [autoFetch, values[asyncRequestDeps]]);

  useEffect(() => {
    if (filterActive) return;
    if (debouncedInputValue?.trim() && isUserInput) {
      fetchData();
    }
  }, [debouncedInputValue]);

  const handleFocus = () => {
    setShowOptions(true);
    if (!autoFetch && !showOptions && !isUserInput) {
      fetchData();
    }
  };

  useEffect(() => {
    const filterOptions = () => {
      if (inputValue && (!asyncRequest || optionsState?.length > 0)) {
        setFilteredOptions(
          optionsState.filter((option) =>
            getOptionsLabel(option)
              ?.toLowerCase()
              ?.trim()
              ?.includes(inputValue.toLowerCase())
          )
        );
      } else {
        setFilteredOptions(optionsState);
      }
    };

    filterOptions();
  }, [inputValue, optionsState]);

  useEffect(() => {
    setSelectedValues(value);
    setInputValue(getOptionsLabel(value) || "");
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;

    setInputValue(newValue);
    setShowOptions(true);
    setIsUserInput(true);
  };

  const handleOptionSelect = (option) => {
    let newSelectedValues;

    console.log("newSelectedValues", option);

    if (multiple) {
      if (selectedValues.some((selected) => isEqualValue(selected, option))) {
        newSelectedValues = selectedValues.filter(
          (item) => !isEqualValue(item, option)
        );
      } else {
        newSelectedValues = [...selectedValues, option];
        setShowOptions(!isCloseAfterSelect);
      }
    } else {
      newSelectedValues = option;
      setInputValue(getOptionsLabel(option));
      setShowOptions(!isCloseAfterSelect);
      setIsUserInput(false);
    }

    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  const handleClickOutside = (event) => {
    if (
      inputContainerRef.current &&
      !inputContainerRef.current.contains(event.target)
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clearInput = () => {
    setSelectedValues(multiple ? [] : null);
    setInputValue("");
    setIsUserInput(true);
    onChange("");
  };

  const clearAllSelected = () => {
    setSelectedValues([]);
    setInputValue("");
    onChange("");
  };

  const removeSelectedOption = (option) => {
    const newSelectedValues = multiple
      ? selectedValues.filter((selected) => !isEqualValue(selected, option))
      : null;
    setSelectedValues(newSelectedValues);
    setInputValue("");
    onChange(multiple ? newSelectedValues : null);
    setIsUserInput(true);
  };

  const isSelected = (option) => {
    return multiple
      ? selectedValues.some((selected) => isEqualValue(selected, option))
      : selectedValues && isEqualValue(selectedValues, option);
  };

  const visibleTags = multiple ? selectedValues?.slice(0, 2) : [];
  const hiddenTagCount =
    selectedValues?.length > 2 ? selectedValues.length - 2 : 0;

  const verticalAutocomplete = () => {
    return (
      <div
        className={clsx(
          "relative h-full text-lg",
          { "pointer-events-none": disabled },
          className
        )}
        ref={inputContainerRef}
        style={{ ...widthStyle, ...heightStyle }}
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        <label
          htmlFor={id}
          className={clsx(
            "absolute left-2 transition-all duration-300 ease-in-out z-[100]",

            labelClassName,
            {
              "text-dark top-0 -translate-y-full": showOptions || inputValue,
              "top-1/2 -translate-y-1/2 text-gray-500":
                !showOptions && !inputValue,
              "text-gray-300": disabled,
            }
          )}
        >
          {required && <span className="text-red-500">*</span>}
          <span> {label}</span>
        </label>
        <div
          className={clsx(
            "relative transition-all duration-300 border-b-2 w-full",
            {
              "border-gray-300": !showOptions && !error && !disabled,
              "border-red-500": error && !disabled,
            }
          )}
        >
          {multiple && (
            <SelectedTags
              visibleTags={visibleTags}
              getOptionsLabel={getOptionsLabel}
              hiddenTagCount={hiddenTagCount}
              clearAllSelected={clearAllSelected}
              selectedValues={selectedValues}
              removeSelectedOption={removeSelectedOption}
            />
          )}

          <Input
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            clearInput={clearInput}
            loading={loading}
            showOptions={showOptions}
            height={height}
            onClick={handleFocus}
            onBlur={onBlur}
            disabled={disabled}
            ref={inputRef}
            id={id}
          />

          <OptionsList
            isSelected={isSelected}
            heightPerOption={heightPerOption}
            loading={loading}
            showOptions={showOptions}
            optionsState={filterActive ? filteredOptions : optionsState}
            row={row}
            handleOptionSelect={handleOptionSelect}
            getOptionSubLabel={getOptionSubLabel}
            getOptionsLabel={getOptionsLabel}
            removeSelectedOption={removeSelectedOption}
            optionsListClassName={optionsListClassName}
            optionsClassName={optionsClassName}
          />
        </div>

        <div
          className={clsx(
            "w-full absolute bottom-[2px] left-0 h-[2px] bg-emerald transition-transform duration-300 ease-in-out",
            {
              "scale-x-0": !showOptions && !inputValue,
              "scale-x-100": showOptions || inputValue,
            }
          )}
        />

        {error && (
          <div className={clsx("text-red-500 text-sm mt-1 ml-2", errorClass)}>
            {error}
          </div>
        )}
      </div>
    );
  };

  const horizontalAutocomplete = () => {
    return (
      <div className={clsx(className)}>
        <div
          className={clsx("flex items-center text-lg", {
            "pointer-events-none": disabled,
          })}
          ref={inputContainerRef}
          style={{ ...widthStyle, ...heightStyle }}
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          <label
            htmlFor={id}
            style={{ width: labelWidth }}
            className={clsx(
              " flex-shrink-0 text-dark font-medium",
              labelClassName
            )}
          >
            {required && <span className="text-red-500">*</span>}
            <span> {label}</span>
          </label>
          <div
            className={clsx(
              "relative ml-4 transition-all duration-300 border-b-2 w-full",
              {
                "border-gray-300": !showOptions && !error && !disabled,
                "border-red-500": error && !disabled,
              }
            )}
          >
            {multiple && (
              <SelectedTags
                visibleTags={visibleTags}
                getOptionsLabel={getOptionsLabel}
                hiddenTagCount={hiddenTagCount}
                clearAllSelected={clearAllSelected}
                selectedValues={selectedValues}
                removeSelectedOption={removeSelectedOption}
              />
            )}

            <Input
              inputValue={inputValue}
              handleInputChange={handleInputChange}
              clearInput={clearInput}
              loading={loading}
              showOptions={showOptions}
              height={height}
              onClick={handleFocus}
              onBlur={onBlur}
              disabled={disabled}
              ref={inputRef}
              id={id}
            />

            <OptionsList
              isSelected={isSelected}
              heightPerOption={heightPerOption}
              loading={loading}
              showOptions={showOptions}
              optionsState={filterActive ? filteredOptions : optionsState}
              row={row}
              handleOptionSelect={handleOptionSelect}
              getOptionSubLabel={getOptionSubLabel}
              getOptionsLabel={getOptionsLabel}
              removeSelectedOption={removeSelectedOption}
              optionsListClassName={optionsListClassName}
              optionsClassName={optionsClassName}
            />

            <div
              className={clsx(
                "w-full absolute bottom-0 left-0 h-[2px] bg-emerald transition-transform duration-300 ease-in-out",
                {
                  "scale-x-0": !showOptions && !inputValue,
                  "scale-x-100": showOptions || inputValue,
                }
              )}
            />
          </div>
        </div>
        {error && (
          <div className={clsx("text-red-500 text-sm mt-1 ml-2", errorClass)}>
            {error}
          </div>
        )}
      </div>
    );
  };

  return orientation === "vertical"
    ? verticalAutocomplete()
    : horizontalAutocomplete();
};

Autocomplete.propTypes = {
  options: PropTypes.array,
  asyncRequest: PropTypes.func,
  getOptionsLabel: PropTypes.func,
  getOptionSubLabel: PropTypes.func,
  isEqualValue: PropTypes.func,
  isCloseAfterSelect: PropTypes.bool,
  asyncRequestHelper: PropTypes.func,
  multiple: PropTypes.bool,
  width: PropTypes.string,
  heightPerOption: PropTypes.string,
  row: PropTypes.number,
  className: PropTypes.string,
  autoFetch: PropTypes.bool,
  height: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default memo(Autocomplete);
