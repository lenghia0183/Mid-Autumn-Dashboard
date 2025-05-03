import React from "react";
import { Pie } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { getProductDistributionData } from "../utils/dataTransformers";

const ProductDistributionChart = ({ data, filterValue }) => {
  const chartData = getProductDistributionData(data);
  
  const period = data?.data?.period ? {
    startDate: data.data.period.startDate,
    endDate: data.data.period.endDate
  } : null;
  
  return (
    <ChartCard
      title={`Tỉ lệ bánh bán chạy theo ${filterValue?.label || "Tháng"}`}
      filterName="productDistributionFilterBy"
      borderColor="#FFD54F"
      titleColor="#00796B"
      period={period}
    >
      <Pie data={chartData} />
    </ChartCard>
  );
};

export default ProductDistributionChart;
