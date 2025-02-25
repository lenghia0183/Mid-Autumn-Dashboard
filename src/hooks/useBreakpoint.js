import { useEffect, useMemo } from "react";
import { breakpoints } from "../config/breakpointConfig";

const useBreakpoint = (breakpoint = "sm") => {
  const mediaQuery = useMemo(() => {
    return window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`);
  }, [breakpoint]);

  useEffect(() => {
    const handleResize = () => {
      if (mediaQuery.matches) {
        return true;
      } else {
        return false;
      }
    };

    handleResize();

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [mediaQuery]);

  return mediaQuery.matches;
};

export default useBreakpoint;
