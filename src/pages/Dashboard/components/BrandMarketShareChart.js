import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { getBrandMarketShareData } from "../utils/dataTransformers";

const BrandMarketShareChart = ({ data, filterValue }) => {
  const chartData = getBrandMarketShareData(data);
  
  const period = data?.data?.period ? {
    startDate: data.data.period.startDate,
    endDate: data.data.period.endDate
  } : null;
  
  return (
    <ChartCard
      title={`Thị phần thương hiệu bán theo ${filterValue?.label || "Tháng"}`}
      filterName="brandMarketShareFilterBy"
      borderColor="#00796B"
      titleColor="#00796B"
      period={period}
    >
      <Doughnut data={chartData} />
    </ChartCard>
  );
};

export default BrandMarketShareChart;
