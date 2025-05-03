import React from "react";
import { Line } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { getVisitorChartData } from "../utils/dataTransformers";

const VisitorChart = ({ data, filterValue }) => {
  const chartData = getVisitorChartData(data);
  
  const period = data?.data?.period ? {
    startDate: new Date(data.data.period.startDate).toLocaleDateString("vi-VN"),
    endDate: new Date(data.data.period.endDate).toLocaleDateString("vi-VN")
  } : null;
  
  const stats = [
    {
      label: "Tổng lượt truy cập",
      value: data?.data?.totalVisits || 0
    },
    {
      label: "Số người dùng",
      value: data?.data?.uniqueVisitors || 0
    }
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
