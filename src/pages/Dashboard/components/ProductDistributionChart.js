import React from "react";
import { Pie } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { getProductDistributionData } from "../utils/dataTransformers";

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

const ProductDistributionChart = ({ data, filterValue }) => {
  const chartData = getProductDistributionData(data);

  const period = data?.data?.period
    ? {
        startDate: formatDateToVietnamese(data.data.period.startDate),
        endDate: formatDateToVietnamese(data.data.period.endDate),
      }
    : null;

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
