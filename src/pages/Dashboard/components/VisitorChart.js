import React from "react";
import { Line } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { getVisitorChartData } from "../utils/dataTransformers";

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

const VisitorChart = ({ data, filterValue }) => {
  const chartData = getVisitorChartData(data);

  const period = data?.data?.period
    ? {
        startDate: formatDateToVietnamese(data.data.period.startDate),
        endDate: formatDateToVietnamese(data.data.period.endDate),
      }
    : null;

  const stats = [
    {
      label: "Tổng lượt truy cập",
      value: data?.data?.totalVisits || 0,
    },
    {
      label: "Số người dùng",
      value: data?.data?.uniqueVisitors || 0,
    },
  ];

  return (
    <ChartCard
      title={`📈 Lượt truy cập website theo ${filterValue?.label || "Tháng"}`}
      filterName="visitorFilterBy"
      borderColor="#FFB74D"
      titleColor="#FFB74D"
      period={period}
      stats={stats}
    >
      <Line data={chartData} />
    </ChartCard>
  );
};

export default VisitorChart;
