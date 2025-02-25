import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import Icon from "../Icon";
import { useQueryState } from "./../../hooks/useQueryState";

const Pagination = ({
  pageCount,
  pageRangeDisplayed = 2,
  marginPagesDisplayed = 1,
  // onPageChange,
  // forcePage = 1,
  previousLabel = "Previous",
  nextLabel = "Next",
  breakLabel = "...",
  className,
  buttonWidth = "2.5rem",
  buttonHeight = "2.5rem",
  buttonClassName,
  labelClassName,
  width,
  previousComponent: PreviousComponent = () => (
    <Icon name="previousPage" size={1} strokeWidth={40} />
  ),
  nextComponent: NextComponent = () => (
    <Icon name="nextPage" size={1} strokeWidth={40} />
  ),
  firstLabel = "First",
  lastLabel = "Last",
  firstComponent: FirstComponent = () => (
    <Icon name="firstPage" size={1} strokeWidth={40} />
  ),
  lastComponent: LastComponent = () => (
    <Icon name="lastPage" size={1} strokeWidth={40} />
  ),
}) => {
  const [ulWidth, setUlWidth] = useState("auto");
  const ulRef = useRef(null);
  const buttonRef = useRef(null);
  const { page, setPage } = useQueryState();

  const currentForcePage = Number(page);

  useEffect(() => {
    if (ulRef.current && buttonRef.current) {
      const calculateWidth = () => {
        const buttonCount = ulRef.current.children.length;
        const buttonWidthPx = parseFloat(
          getComputedStyle(buttonRef.current).width
        );
        const buttonGapPx = parseFloat(getComputedStyle(ulRef.current).gap);
        const width =
          buttonCount * buttonWidthPx + (buttonCount - 1) * buttonGapPx;
        setUlWidth(`${width}px`);
      };
      calculateWidth();
      window.addEventListener("resize", calculateWidth);
      return () => window.removeEventListener("resize", calculateWidth);
    }
  }, [pageCount, currentForcePage, buttonWidth, buttonHeight]);

  const handlePageClick = (selectedPage) => {
    if (selectedPage !== currentForcePage) {
      setPage(selectedPage);
    }
  };

  const handlePreviousClick = () => {
    if (currentForcePage > 1) {
      handlePageClick(currentForcePage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentForcePage < pageCount) {
      handlePageClick(currentForcePage + 1);
    }
  };

  const handleFirstClick = () => {
    if (currentForcePage !== 1) {
      handlePageClick(1);
    }
  };

  const handleLastClick = () => {
    if (currentForcePage !== pageCount) {
      handlePageClick(pageCount);
    }
  };

  const renderPages = () => {
    const pages = [];
    const activePage = currentForcePage;

    for (let i = 1; i <= pageCount; i++) {
      const isActive = i === activePage;
      const inRange =
        i >= Math.max(1, activePage - pageRangeDisplayed) &&
        i <= Math.min(pageCount, activePage + pageRangeDisplayed);
      const isMargin =
        i <= marginPagesDisplayed || i > pageCount - marginPagesDisplayed;

      if (inRange || isMargin) {
        pages.push(
          <li
            key={i}
            style={{ width: buttonWidth, height: buttonHeight }}
            ref={i === activePage ? buttonRef : null}
            className={clsx(
              "flex items-center justify-center flex-shrink-0 text-emerald font-semibold border cursor-pointer rounded-md border-emerald-50 hover:bg-emerald hover:text-white transition duration-300",
              buttonClassName,
              { "bg-emerald text-white": isActive }
            )}
            onClick={() => handlePageClick(i)}
          >
            <span className={labelClassName}>{i}</span>
          </li>
        );
      } else if (
        i === Math.max(1, activePage - pageRangeDisplayed) - 1 ||
        i === Math.min(pageCount, activePage + pageRangeDisplayed) + 1
      ) {
        pages.push(
          <li
            key={`break-${i}`}
            style={{ width: buttonWidth, height: buttonHeight }}
            className={clsx(
              "flex items-center justify-center text-emerald font-semibold",
              buttonClassName
            )}
          >
            <span className={labelClassName}>{breakLabel}</span>
          </li>
        );
      }
    }

    return pages;
  };

  if (!pageCount) {
    return null;
  }

  return (
    <ul
      ref={ulRef}
      style={{ width: width || ulWidth }}
      className={clsx(
        "flex flex-wrap gap-2 items-center transition-all duration-300",
        className
      )}
    >
      <li
        style={{ width: buttonWidth, height: buttonHeight }}
        className={clsx(
          "flex items-center justify-center cursor-pointer flex-shrink-0 rounded-md border border-emerald-50 text-emerald transition duration-300",
          buttonClassName,
          { "opacity-50 cursor-default": currentForcePage === 1 },
          { " hover:bg-emerald hover:text-white": currentForcePage !== 1 }
        )}
        onClick={handleFirstClick}
      >
        {FirstComponent ? (
          <FirstComponent />
        ) : (
          <span className={labelClassName}>{firstLabel}</span>
        )}
      </li>

      <li
        style={{ width: buttonWidth, height: buttonHeight }}
        className={clsx(
          "flex items-center justify-center cursor-pointer flex-shrink-0 rounded-md border border-emerald-50 text-emerald transition duration-300",
          buttonClassName,
          { "opacity-50 cursor-default": currentForcePage === 1 },
          { " hover:bg-emerald hover:text-white": currentForcePage !== 1 }
        )}
        onClick={handlePreviousClick}
      >
        {PreviousComponent ? (
          <PreviousComponent />
        ) : (
          <span className={labelClassName}>{previousLabel}</span>
        )}
      </li>

      {renderPages()}

      <li
        style={{ width: buttonWidth, height: buttonHeight }}
        className={clsx(
          "flex items-center justify-center cursor-pointer flex-shrink-0 rounded-md border border-emerald-50 text-emerald transition duration-300",
          buttonClassName,
          { "opacity-50 cursor-default": currentForcePage === pageCount },
          {
            " hover:bg-emerald hover:text-white":
              currentForcePage !== pageCount,
          }
        )}
        onClick={handleNextClick}
      >
        {NextComponent ? (
          <NextComponent />
        ) : (
          <span className={labelClassName}>{nextLabel}</span>
        )}
      </li>

      <li
        style={{ width: buttonWidth, height: buttonHeight }}
        className={clsx(
          "flex items-center justify-center cursor-pointer flex-shrink-0 rounded-md border border-emerald-50 text-emerald transition duration-300",
          buttonClassName,
          { "opacity-50 cursor-default": currentForcePage === pageCount },
          {
            " hover:bg-emerald hover:text-white":
              currentForcePage !== pageCount,
          }
        )}
        onClick={handleLastClick}
      >
        {LastComponent ? (
          <LastComponent />
        ) : (
          <span className={labelClassName}>{lastLabel}</span>
        )}
      </li>
    </ul>
  );
};

export default Pagination;
