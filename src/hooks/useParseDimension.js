import { useMemo } from "react";

const useParseDimension = (dimensionString) => {
  return useMemo(() => {
    const value = parseFloat(dimensionString);

    if (isNaN(value)) {
      return { value: 0, unit: "rem" };
    }

    const unit = dimensionString?.replace(value, "")?.trim() || "rem";

    return { value, unit };
  }, [dimensionString]);
};

export default useParseDimension;
