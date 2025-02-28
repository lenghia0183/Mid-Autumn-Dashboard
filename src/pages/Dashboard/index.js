"use client";

import { Bar, Pie, Line, Radar, PolarArea, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

const COLORS = {
  primary: "#00796B", // Xanh nhạt hơn
  yellow: "#FFD54F", // Vàng nhạt
  orange: "#FFB74D", // Cam nhạt
  red: "#E57373", // Đỏ nhạt
  gray: "#BDBDBD", // Xám nhạt
};

const dataBar = {
  labels: ["Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10"],
  datasets: [
    {
      label: "Doanh thu (triệu VND)",
      data: [120, 250, 400, 180],
      backgroundColor: COLORS.primary,
    },
  ],
};

const dataPie = {
  labels: ["Bánh Thập Cẩm", "Bánh Đậu Xanh", "Bánh Sữa Dừa", "Bánh Hạt Sen"],
  datasets: [
    {
      data: [35, 40, 25, 30],
      backgroundColor: [
        COLORS.primary,
        COLORS.yellow,
        COLORS.orange,
        COLORS.red,
      ],
    },
  ],
};

const dataLine = {
  labels: ["01/08", "08/08", "15/08", "22/08", "29/08"],
  datasets: [
    {
      label: "Lượt truy cập",
      data: [500, 800, 1200, 1100, 900],
      borderColor: COLORS.yellow,
      backgroundColor: "rgba(255, 213, 79, 0.2)",
      fill: true,
    },
  ],
};

const dataRadar = {
  labels: ["Chất lượng", "Hương vị", "Giá cả", "Dịch vụ", "Giao hàng"],
  datasets: [
    {
      label: "Đánh giá (trên 10)",
      data: [9, 8, 7, 9, 8],
      borderColor: COLORS.primary,
      backgroundColor: "rgba(0, 121, 107, 0.2)",
    },
  ],
};

const dataPolar = {
  labels: ["Hà Nội", "TP.HCM", "Đà Nẵng", "Hải Phòng", "Cần Thơ"],
  datasets: [
    {
      data: [50, 80, 30, 40, 25],
      backgroundColor: [
        COLORS.primary,
        COLORS.yellow,
        COLORS.orange,
        COLORS.red,
        COLORS.gray,
      ],
    },
  ],
};

const dataDoughnut = {
  labels: ["Kinh Đô", "Như Lan", "Bibica", "Đồng Khánh"],
  datasets: [
    {
      data: [40, 25, 20, 15],
      backgroundColor: [
        COLORS.primary,
        COLORS.yellow,
        COLORS.orange,
        COLORS.red,
      ],
    },
  ],
};

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6 bg-gray-100">
      <div className="bg-white p-4 rounded shadow border-l-4 border-[#00796B]">
        <h2 className="text-lg font-bold text-[#00796B] mb-3">
          📊 Doanh thu theo tháng
        </h2>
        <Bar data={dataBar} />
      </div>
      <div className="bg-white p-4 rounded shadow border-l-4 border-[#FFD54F]">
        <h2 className="text-lg font-bold text-[#FFD54F] mb-3">
          🍪 Tỉ lệ bánh bán chạy
        </h2>
        <Pie data={dataPie} />
      </div>
      <div className="bg-white p-4 rounded shadow border-l-4 border-[#FFB74D]">
        <h2 className="text-lg font-bold text-[#FFB74D] mb-3">
          📈 Lượt truy cập website
        </h2>
        <Line data={dataLine} />
      </div>
      <div className="bg-white p-4 rounded shadow border-l-4 border-[#E57373]">
        <h2 className="text-lg font-bold text-[#E57373] mb-3">
          🌟 Phản hồi khách hàng
        </h2>
        <Radar data={dataRadar} />
      </div>
      <div className="bg-white p-4 rounded shadow border-l-4 border-[#BDBDBD]">
        <h2 className="text-lg font-bold text-[#BDBDBD] mb-3">
          🗺️ Đơn hàng theo khu vực
        </h2>
        <PolarArea data={dataPolar} />
      </div>
      <div className="bg-white p-4 rounded shadow border-l-4 border-[#00796B]">
        <h2 className="text-lg font-bold text-[#00796B] mb-3">
          🏪 Thị phần thương hiệu bánh
        </h2>
        <Doughnut data={dataDoughnut} />
      </div>
    </div>
  );
}
