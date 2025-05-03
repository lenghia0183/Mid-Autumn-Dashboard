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
  useGetOrderByRegion,
  useGetProductDistribution,
  useGetRevenueProfit,
  useGetReviews,
  useGetVisitor,
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

// Create dynamic visitor data chart based on API response
const getVisitorChartData = (visitorData) => {
  if (!visitorData?.data?.visitsByTime) {
    return {
      labels: [],
      datasets: [
        {
          label: "Lượt truy cập",
          data: [],
          borderColor: COLORS.yellow,
          backgroundColor: "rgba(255, 213, 79, 0.2)",
          fill: true,
        },
      ],
    };
  }

  // Xử lý nhãn dựa trên loại lọc
  const labels = visitorData.data.visitsByTime.map((item) => {
    // Nếu có trường date
    if (item.date) {
      return item.date;
    }
    // Nếu có trường week (định dạng "2025-W17")
    else if (item.week) {
      return `Tuần ${item.week.split("-W")[1]}/${item.week.split("-")[0]}`;
    }
    // Nếu có trường month (định dạng "2025-05")
    else if (item.month) {
      const [year, month] = item.month.split("-");
      return `Tháng ${month}/${year}`;
    }
    // Nếu có trường year
    else if (item.year) {
      return `Năm ${item.year}`;
    }
    // Trường hợp khác
    return "N/A";
  });

  return {
    labels: labels,
    datasets: [
      {
        label: "Lượt truy cập",
        data: visitorData.data.visitsByTime.map((item) => item.count),
        borderColor: COLORS.yellow,
        backgroundColor: "rgba(255, 213, 79, 0.2)",
        fill: true,
      },
    ],
  };
};

// Hàm tạo dữ liệu biểu đồ đánh giá từ API
const getReviewsChartData = (reviewsData) => {
  if (!reviewsData?.data?.ratingDistribution) {
    return {
      labels: ["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"],
      datasets: [
        {
          label: "Số lượng đánh giá",
          data: [0, 0, 0, 0, 0],
          backgroundColor: [
            COLORS.red,
            COLORS.orange,
            COLORS.yellow,
            COLORS.green,
            COLORS.primary,
          ],
          borderColor: [
            COLORS.red,
            COLORS.orange,
            COLORS.yellow,
            COLORS.green,
            COLORS.primary,
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  // Sắp xếp phân phối đánh giá theo số sao (1-5)
  const sortedDistribution = [...reviewsData.data.ratingDistribution].sort(
    (a, b) => a.rating - b.rating
  );

  return {
    labels: sortedDistribution.map((item) => `${item.rating} sao`),
    datasets: [
      {
        label: "Số lượng đánh giá",
        data: sortedDistribution.map((item) => item.count),
        backgroundColor: [
          COLORS.red,
          COLORS.orange,
          COLORS.yellow,
          COLORS.green,
          COLORS.primary,
        ],
        borderColor: [
          COLORS.red,
          COLORS.orange,
          COLORS.yellow,
          COLORS.green,
          COLORS.primary,
        ],
        borderWidth: 1,
      },
    ],
  };
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

  const { data: orderByRegionData, mutate: refreshOrderByRegion } =
    useGetOrderByRegion({
      filterBy: values?.orderByRegionFilterBy?.value,
    });

  const { data: visitorData, mutate: refreshVisitorData } = useGetVisitor({
    filterBy: values?.visitorFilterBy?.value,
  });

  const { data: reviewsData, mutate: refreshReviewsData } = useGetReviews({
    filterBy: values?.reviewsFilterBy?.value,
  });

  // console.log("brandMarketShareData", brandMarketShareData);
  // console.log("productDistributionData", productDistributionData);
  // console.log("revenueData", revenueData);
  // console.log("orderByRegionData", orderByRegionData);
  // console.log("visitorData", visitorData);
  // console.log("reviewsData", reviewsData);

  useEffect(() => {
    refreshRevenueData();
  }, [values?.revenueFilterBy]);

  useEffect(() => {
    refreshProductDistribution();
  }, [values?.productDistributionFilterBy]);

  useEffect(() => {
    refreshBrandMarketShare();
  }, [values?.brandMarketShareFilterBy]);

  useEffect(() => {
    refreshOrderByRegion();
  }, [values?.orderByRegionFilterBy]);

  useEffect(() => {
    refreshVisitorData();
  }, [values?.visitorFilterBy]);

  useEffect(() => {
    refreshReviewsData();
  }, [values?.reviewsFilterBy]);

  const dataBar = {
    labels:
      revenueData?.data?.map((item) => {
        if (values?.revenueFilterBy?.value === "month") {
          return item.month;
        } else if (values?.revenueFilterBy?.value === "year") {
          return item.year;
        } else if (values?.revenueFilterBy?.value === "week") {
          return `Tử ${item.startDate} đến ${item.endDate}`;
        } else if (values?.revenueFilterBy?.value === "day") {
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

  const dataPolar = {
    labels:
      orderByRegionData?.data?.topCities?.map((item) => item.provinceName) ||
      [],
    datasets: [
      {
        data:
          orderByRegionData?.data?.topCities?.map((item) => item.count) || [],
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

  const filterBy = [
    {
      label: "Ngày",
      value: "day",
    },
    {
      label: "Tuần",
      value: "week",
    },
    {
      label: "Tháng",
      value: "month",
    },
    {
      label: "Năm",
      value: "year",
    },
  ];

  return (
    <Formik
      initialValues={{
        revenueFilterBy: filterBy[2],
        productDistributionFilterBy: filterBy[2],
        brandMarketShareFilterBy: filterBy[2],
        orderByRegionFilterBy: filterBy[2],
        visitorFilterBy: filterBy[2],
        reviewsFilterBy: filterBy[3],
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
                <h3 className="text-sm text-gray-600 mb-2">{`Từ ${productDistributionData?.data?.period?.startDate} đến ${productDistributionData?.data?.period?.endDate}`}</h3>

                <Pie data={dataPie} />
              </div>
              <div className="bg-white p-4 rounded shadow border-l-4 border-[#FFB74D]">
                <div className="flex justify-between items-center gap-10 mb-5">
                  <h2 className="text-lg font-bold text-[#FFB74D]">
                    {`📈 Lượt truy cập website theo ${values.visitorFilterBy.label}`}
                  </h2>
                  <FormikAutoComplete
                    name="visitorFilterBy"
                    options={filterBy}
                    getOptionLabel={(opt) => opt.label}
                    isEqualValue={(val, opt) => val.value === opt.value}
                    label="Lọc theo"
                  />
                </div>
                {visitorData?.data?.period && (
                  <h3 className="text-sm text-gray-600 mb-2">
                    {`Từ ${new Date(
                      visitorData.data.period.startDate
                    ).toLocaleDateString("vi-VN")} đến ${new Date(
                      visitorData.data.period.endDate
                    ).toLocaleDateString("vi-VN")}`}
                  </h3>
                )}
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="font-bold">Tổng lượt truy cập:</span>{" "}
                    {visitorData?.data?.totalVisits || 0}
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="font-bold">Số người dùng:</span>{" "}
                    {visitorData?.data?.uniqueVisitors || 0}
                  </div>
                </div>
                <Line data={getVisitorChartData(visitorData)} />
              </div>
              <div className="bg-white p-4 rounded shadow border-l-4 border-[#E57373]">
                <div className="flex justify-between items-center gap-10 mb-5">
                  <h2 className="text-lg font-bold text-[#E57373]">
                    {`🌟 Đánh giá khách hàng theo ${
                      values.reviewsFilterBy?.label || "Tháng"
                    }`}
                  </h2>
                  <FormikAutoComplete
                    name="reviewsFilterBy"
                    options={filterBy}
                    getOptionLabel={(opt) => opt.label}
                    isEqualValue={(val, opt) => val.value === opt.value}
                    label="Lọc theo"
                  />
                </div>
                {reviewsData?.data?.period && (
                  <h3 className="text-sm text-gray-600 mb-2">
                    {`Từ ${new Date(
                      reviewsData.data.period.startDate
                    ).toLocaleDateString("vi-VN")} đến ${new Date(
                      reviewsData.data.period.endDate
                    ).toLocaleDateString("vi-VN")}`}
                  </h3>
                )}
                <div className="flex items-center justify-between mb-2">
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="font-bold">Tổng số đánh giá:</span>{" "}
                    {reviewsData?.data?.totalReviews || 0}
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <span className="font-bold">Đánh giá trung bình:</span>{" "}
                    {reviewsData?.data?.averageRating
                      ? reviewsData.data.averageRating.toFixed(1)
                      : 0}{" "}
                    / 5
                  </div>
                </div>
                <Bar data={getReviewsChartData(reviewsData)} />
              </div>
              <div className="bg-white p-4 rounded shadow border-l-4 border-[#BDBDBD]">
                <div className="flex justify-between items-center gap-10 mb-5">
                  <h2 className="text-lg font-bold text-[#00796B]">
                    {`Đơn hàng theo khu vực theo ${values.orderByRegionFilterBy.label}`}
                  </h2>
                  <FormikAutoComplete
                    name="orderByRegionFilterBy"
                    options={filterBy}
                    getOptionLabel={(opt) => opt.label}
                    isEqualValue={(val, opt) => val.value === opt.value}
                    label="Lọc theo"
                  />
                </div>
                <h3 className="text-sm text-gray-600 mb-2">{`Từ ${orderByRegionData?.data?.period?.startDate} đến ${orderByRegionData?.data?.period?.endDate}`}</h3>
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
                <h3 className="text-sm text-gray-600 mb-2">{`Từ ${brandMarketShareData?.data?.period?.startDate} đến ${brandMarketShareData?.data?.period?.endDate}`}</h3>
                <Doughnut data={dataDoughnut} />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
