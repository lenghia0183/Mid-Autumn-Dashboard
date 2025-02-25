import { useMemo, useEffect, useState } from "react";
import { breakpointsWithoutPx } from "./../config/breakpointConfig";

// Ánh xạ các lớp Tailwind CSS tới giá trị CSS
const valueMapping = {
  0: "0px",
  full: "100%",
  "1/2": "50%",
  "1/3": "33.3333%",
  "1/4": "25%",
  "1/5": "20%",
  "1/6": "16.6667%",
  // Thêm các lớp khác nếu cần
};

const propertyMapping = {
  w: "width",
  h: "height",
  "min-w": "min-width",
  "min-h": "min-height",
  "max-w": "max-width",
  "max-h": "max-height",
};

const parseStyleString = (styleString, windowWidth, failBackProperty) => {
  const style = {};
  const entries = styleString?.split(" ");

  const appliedStyles = {};

  const defaultStyles = {};

  entries?.forEach((entry) => {
    const [breakpoint, classValue] = entry?.split(":");

    if (breakpoint && classValue && breakpointsWithoutPx[breakpoint]) {
      let property = "";
      let value = "";

      // const [property, value] = classValue?.split("-")?.length === 2;
      const classValueArray = classValue?.split("-");
      property =
        classValueArray?.length === 2
          ? classValueArray[0]
          : classValueArray?.slice(0, -1)?.join("-");

      value = classValueArray[classValueArray.length - 1];

      if (breakpointsWithoutPx[breakpoint] <= windowWidth) {
        const cssProperty = propertyMapping[property];

        const cssValue = valueMapping[value] || value?.slice(1, -1);
        if (
          !appliedStyles[cssProperty] ||
          breakpointsWithoutPx[breakpoint] >
            appliedStyles[cssProperty]?.breakpoint
        ) {
          appliedStyles[cssProperty] = {
            value: cssValue,
            breakpoint: breakpointsWithoutPx[breakpoint],
          };
        }
      }
    } else if (!breakpointsWithoutPx[breakpoint]) {
      let property = "";
      let value = "";

      const entryArray = entry?.split("-");
      property = entryArray?.slice(0, -1)?.join("-");
      value = entryArray[entryArray.length - 1];
      // const [property, value] = entry?.split("-");

      if (property && value) {
        const cssProperty = propertyMapping[property];
        const cssValue = valueMapping[value] || value?.slice(1, -1);
        defaultStyles[cssProperty] = cssValue;
      } else {
        const cssProperty = propertyMapping[failBackProperty];
        const cssValue = entry;
        defaultStyles[cssProperty] = cssValue;
      }
    }
  });

  Object.keys(appliedStyles).forEach((cssProperty) => {
    style[cssProperty] = appliedStyles[cssProperty].value;
  });

  Object.keys(defaultStyles).forEach((cssProperty) => {
    if (!style[cssProperty]) {
      style[cssProperty] = defaultStyles[cssProperty];
    }
  });

  return style;
};

const useResponsiveStyle = (styleString, failBackProperty) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const style = useMemo(
    () => parseStyleString(styleString, windowWidth, failBackProperty),
    [styleString, windowWidth, failBackProperty]
  );

  return style;
};

export default useResponsiveStyle;
