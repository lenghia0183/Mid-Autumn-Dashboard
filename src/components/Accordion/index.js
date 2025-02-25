import { useState, useRef, useEffect } from "react";
import Button from "../Button";
import Icon from "../Icon";
import clsx from "clsx";
import useResponsiveStyle from "../../hooks/useResponsiveStyle";
import useParseDimension from "../../hooks/useParseDimension";

const Accordion = ({
  children,
  minHeight = "100px",
  maxHeight = "",
  className,
  buttonClassName,
  iconClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const { "max-height": newMaxHeightStyle } = useResponsiveStyle(
    maxHeight,
    "max-h"
  );

  const { "min-height": newMinHeightStyle } = useResponsiveStyle(
    minHeight,
    "min-h"
  );

  const { value: newMinHeightStyleValue } =
    useParseDimension(newMinHeightStyle);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, children]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const showToggleButton = contentHeight > newMinHeightStyleValue;

  return (
    <div className={clsx("w-full", className)}>
      <div
        ref={contentRef}
        className="transition-max-height duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen
            ? newMaxHeightStyle || `${contentHeight}px`
            : newMinHeightStyle,
        }}
      >
        {children}
      </div>

      {showToggleButton && (
        <Button
          onClick={toggleAccordion}
          variant="text"
          bgHoverColor="transparent"
          className={clsx("mx-auto", buttonClassName)}
          startIcon={
            <Icon
              name="arrowDown"
              size="1em"
              className={clsx(
                "transition-transform ease-in-out duration-500",
                {
                  "rotate-180": isOpen,
                  "rotate-0": !isOpen,
                },
                iconClassName
              )}
            />
          }
        >
          {isOpen ? "Thu gọn" : "Xem thêm"}
        </Button>
      )}
    </div>
  );
};

export default Accordion;
