import React from "react";
import { Bar } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { getRevenueChartData } from "../utils/dataTransformers";

const RevenueChart = ({ data, filterValue }) => {
  const chartData = getRevenueChartData(data, filterValue?.value);

  return (
    <ChartCard
      title={`Doanh thu & Lợi nhuận theo ${filterValue?.label || "Tháng"}`}
      filterName="revenueFilterBy"
      borderColor="#00796B"
    >
      <Bar data={chartData} />
    </ChartCard>
  );
};

export default RevenueChart;
