import PropTypes from "prop-types";
import Icon from "../../Icon";

const SelectedTags = ({
  visibleTags,
  getOptionsLabel,
  hiddenTagCount,
  clearAllSelected,
  selectedValues,
  removeSelectedOption,
}) => {
  return (
    <div className="selected-tag-container flex flex-wrap  item-center max-w-full min-h-0 transition-all duration-300 ease-in-out">
      {visibleTags.map((selectedOption, index) => (
        <div
          key={index}
          className={`selected-tag-item flex-shrink-0 flex items-center gap-x-1 border border-gray-500 rounded-full px-2 py-1 mr-2 max-w-4/5 text-sm mt-2 `}
        >
          <span className="overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
            {getOptionsLabel(selectedOption)}
          </span>
          <button
            type="button"
            onClick={() => removeSelectedOption(selectedOption)}
            className="text-gray-500 flex item-center"
          >
            <Icon name="closeCircle" color="text-gray-500" size="1.5em" />
          </button>
        </div>
      ))}
      {hiddenTagCount > 0 && (
        <span className="text-gray-500 h-full inline-block py-1 mt-2">
          +{hiddenTagCount} khác...
        </span>
      )}
      {selectedValues?.length > 0 && (
        <button
          type="button"
          onClick={clearAllSelected}
          className="text-gray-500 ml-2 inline-block h-full py-1 mt-2"
        >
          Xóa tất cả
        </button>
      )}
    </div>
  );
};

SelectedTags.propTypes = {
  selectedValues: PropTypes.array.isRequired,
  getOptionsLabel: PropTypes.func.isRequired,
  removeSelectedOption: PropTypes.func.isRequired,
  clearAllSelected: PropTypes.func.isRequired,
  hiddenTagCount: PropTypes.number.isRequired,
};

export default SelectedTags;
