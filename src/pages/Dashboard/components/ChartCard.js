import React from "react";
import FormikAutoComplete from "../../../components/Formik/FormikAutoComplete";
import { filterOptions } from "../utils/chartUtils";

const ChartCard = ({
  title,
  filterName,
  borderColor,
  titleColor,
  children,
  period,
  stats,
}) => {
  return (
    <div className={`bg-white p-4 rounded shadow border-l-4 border-[${borderColor}]`}>
      <div className="flex justify-between items-center gap-10 mb-5">
        <h2 className={`text-lg font-bold text-[${titleColor || borderColor}]`}>
          {title}
        </h2>
        <FormikAutoComplete
          name={filterName}
          options={filterOptions}
          getOptionLabel={(opt) => opt?.label}
          isEqualValue={(val, opt) => val?.value === opt?.value}
          label="Lọc theo"
        />
      </div>
      
      {period && (
        <h3 className="text-sm text-gray-600 mb-2">
          {`Từ ${period.startDate} đến ${period.endDate}`}
        </h3>
      )}
      
      {stats && (
        <div className="flex items-center justify-between mb-2">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded">
              <span className="font-bold">{stat.label}:</span>{" "}
              {stat.value}
            </div>
          ))}
        </div>
      )}
      
      {children}
    </div>
  );
};

export default ChartCard;
