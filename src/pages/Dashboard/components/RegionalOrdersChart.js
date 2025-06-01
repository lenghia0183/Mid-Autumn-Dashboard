import React from "react";
import { PolarArea } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { getOrderByRegionData } from "../utils/dataTransformers";

// Helper function to format date to Vietnamese style
const formatDateToVietnamese = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day} tháng ${month} năm ${year}`;
};

const RegionalOrdersChart = ({ data, filterValue }) => {
  const chartData = getOrderByRegionData(data);

  const period = data?.data?.period
    ? {
        startDate: formatDateToVietnamese(data.data.period.startDate),
        endDate: formatDateToVietnamese(data.data.period.endDate),
      }
    : null;

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
