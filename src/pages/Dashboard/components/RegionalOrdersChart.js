import React from "react";
import { PolarArea } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { getOrderByRegionData } from "../utils/dataTransformers";

const RegionalOrdersChart = ({ data, filterValue }) => {
  const chartData = getOrderByRegionData(data);
  
  const period = data?.data?.period ? {
    startDate: data.data.period.startDate,
    endDate: data.data.period.endDate
  } : null;
  
  return (
    <ChartCard
      title={`Đơn hàng theo khu vực theo ${filterValue?.label || "Tháng"}`}
      filterName="orderByRegionFilterBy"
      borderColor="#BDBDBD"
      titleColor="#00796B"
      period={period}
    >
      <PolarArea data={chartData} />
    </ChartCard>
  );
};

export default RegionalOrdersChart;
