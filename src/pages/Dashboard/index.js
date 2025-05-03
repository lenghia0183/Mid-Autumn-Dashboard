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
import {
  useGetBrandMarketShare,
  useGetProductDistribution,
  useGetRevenueProfit,
} from "../../service/https/statistic";
import { Form, Formik } from "formik";
import FormikAutoComplete from "../../components/Formik/FormikAutoComplete";
import { useEffect, useRef, useState } from "react";

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
  green: "#00C853", // Xanh lá nhạt
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

export default function Dashboard() {
  const innerForm = useRef();
  const [values, setValues] = useState();

  const { data: revenueData, mutate: refreshRevenueData } = useGetRevenueProfit(
    {
      filterBy: innerForm.current?.values?.revenueFilterBy?.value,
    }
  );

  const { data: productDistributionData, mutate: refreshProductDistribution } =
    useGetProductDistribution({
      filterBy: values?.productDistributionFilterBy?.value,
    });

  const { data: brandMarketShareData, mutate: refreshBrandMarketShare } =
    useGetBrandMarketShare({
      filterBy: values?.brandMarketShareFilterBy?.value,
    });

  // console.log("brandMarketShareData", brandMarketShareData);
  // console.log("productDistributionData", productDistributionData);
  // console.log("revenueData", revenueData);

  useEffect(() => {
    refreshRevenueData();
  }, [values?.revenueFilterBy]);

  useEffect(() => {
    refreshProductDistribution();
  }, [values?.productDistributionFilterBy]);

  useEffect(() => {
    refreshBrandMarketShare();
  }, [values?.brandMarketShareFilterBy]);

  const dataBar = {
    labels:
      revenueData?.data?.map((item) => {
        if (values?.revenueFilterBy?.value === "month") {
          return item.month;
        } else if (values?.revenueFilterBy?.value === "year") {
          return item.year;
        } else if (values?.revenueFilterBy?.value === "week") {
          // return item.week;
          return `Tử ${item.startDate} đến ${item.endDate}`;
        } else if (values?.revenueFilterBy?.value === "day") {
          // return item.day;
          return item.formattedDate;
        }
      }) || [],
    datasets: [
      {
        label: "Doanh thu (triệu VND)",
        data: revenueData?.data.map((item) => item.revenue) || [],
        backgroundColor: COLORS.primary,
      },
    ],
  };

  const dataPie = {
    labels: productDistributionData?.data?.othersPercentage
      ? productDistributionData?.data?.topProducts
          ?.map((item) => item.name)
          .concat("Các sản phẩm khác")
      : productDistributionData?.data?.topProducts?.map((item) => item.name) ||
        [],
    datasets: [
      {
        data:
          productDistributionData?.data?.topProducts
            ?.map((item) => item.percentage)
            .concat(productDistributionData?.data?.othersPercentage) || [],
        backgroundColor: [
          COLORS.primary,
          COLORS.yellow,
          COLORS.orange,
          COLORS.red,
          COLORS.gray,
          COLORS.green,
        ],
      },
    ],
  };

  const dataDoughnut = {
    labels: brandMarketShareData?.data?.brands?.map((item) => item.name) || [],
    datasets: [
      {
        data:
          brandMarketShareData?.data?.brands?.map(
            (item) => item.marketSharePercentage
          ) || [],
        backgroundColor: [
          COLORS.primary,
          COLORS.yellow,
          COLORS.orange,
          COLORS.red,
        ],
      },
    ],
  };

  const filterBy = [
    {
      label: "Tháng",
      value: "month",
    },
    {
      label: "Năm",
      value: "year",
    },
    {
      label: "Tuần",
      value: "week",
    },
    {
      label: "Ngày",
      value: "day",
    },
  ];

  return (
    <Formik
      initialValues={{
        revenueFilterBy: filterBy[0],
        productDistributionFilterBy: filterBy[0],
        brandMarketShareFilterBy: filterBy[0],
      }}
      enableReinitialize
      innerRef={(ref) => {
        innerForm.current = ref;
        setValues(ref?.values);
      }}
    >
      {({ values }) => {
        return (
          <Form>
            <div className="grid grid-cols-3 gap-6 p-6 bg-gray-100">
              <div className="bg-white p-4 rounded shadow border-l-4 border-[#00796B]">
                <div className="flex justify-between items-center gap-10 mb-5">
                  <h2 className=" flex-shrink-0 text-lg font-bold text-[#00796B]">
                    {`Doanh thu theo ${values.revenueFilterBy.label}`}
                  </h2>
                  <FormikAutoComplete
                    name="revenueFilterBy"
                    options={filterBy}
                    getOptionLabel={(opt) => opt.label}
                    isEqualValue={(val, opt) => val.value === opt.value}
                    label="Lọc theo"
                  />
                </div>
                <Bar data={dataBar} />
              </div>
              <div className="bg-white p-4 rounded shadow border-l-4 border-[#FFD54F]">
                <div className="flex justify-between items-center gap-10 mb-5">
                  <h2 className=" text-lg font-bold text-[#00796B]">
                    {`Tỉ lệ bánh bán chạy theo ${values.productDistributionFilterBy.label}`}
                  </h2>
                  <FormikAutoComplete
                    name="productDistributionFilterBy"
                    options={filterBy}
                    getOptionLabel={(opt) => opt?.label}
                    isEqualValue={(val, opt) => val?.value === opt?.value}
                    label="Lọc theo"
                  />
                </div>
                <h3>{`Từ ${productDistributionData?.data?.period?.startDate} đến ${productDistributionData?.data?.period?.endDate}`}</h3>

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
                <div className="flex justify-between items-center gap-10 mb-5">
                  <h2 className=" text-lg font-bold text-[#00796B]">
                    {`Thị phần thương hiệu bán theo ${values.brandMarketShareFilterBy.label}`}
                  </h2>
                  <FormikAutoComplete
                    name="brandMarketShareFilterBy"
                    options={filterBy}
                    getOptionLabel={(opt) => opt?.label}
                    isEqualValue={(val, opt) => val?.value === opt?.value}
                    label="Lọc theo"
                  />
                </div>
                <h3>{`Từ ${brandMarketShareData?.data?.period?.startDate} đến ${brandMarketShareData?.data?.period?.endDate}`}</h3>
                <Doughnut data={dataDoughnut} />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
