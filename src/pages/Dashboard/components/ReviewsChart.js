import React from "react";
import { Bar } from "react-chartjs-2";
import ChartCard from "./ChartCard";
import { getReviewsChartData } from "../utils/dataTransformers";

const ReviewsChart = ({ data, filterValue }) => {
  const chartData = getReviewsChartData(data);
  
  const period = data?.data?.period ? {
    startDate: new Date(data.data.period.startDate).toLocaleDateString("vi-VN"),
    endDate: new Date(data.data.period.endDate).toLocaleDateString("vi-VN")
  } : null;
  
  const stats = [
    {
      label: "Tổng số đánh giá",
      value: data?.data?.totalReviews || 0
    },
    {
      label: "Đánh giá trung bình",
      value: data?.data?.averageRating
        ? `${data.data.averageRating.toFixed(1)} / 5`
        : "0 / 5"
    }
  ];
  
  return (
    <ChartCard
      title={`🌟 Đánh giá khách hàng theo ${filterValue?.label || "Tháng"}`}
      filterName="reviewsFilterBy"
      borderColor="#E57373"
      titleColor="#E57373"
      period={period}
      stats={stats}
    >
      <Bar data={chartData} />
    </ChartCard>
  );
};

export default ReviewsChart;
