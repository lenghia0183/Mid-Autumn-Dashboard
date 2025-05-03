import { generateColors } from "./chartUtils";

// Create dynamic visitor data chart based on API response
export const getVisitorChartData = (visitorData) => {
  if (!visitorData?.data?.visitsByTime) {
    return {
      labels: [],
      datasets: [
        {
          label: "Lượt truy cập",
          data: [],
          borderColor: "#FFD54F",
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
        borderColor: "#FFD54F",
        backgroundColor: "rgba(255, 213, 79, 0.2)",
        fill: true,
      },
    ],
  };
};

// Hàm tạo dữ liệu biểu đồ đánh giá từ API
export const getReviewsChartData = (reviewsData) => {
  if (!reviewsData?.data?.ratingDistribution) {
    const defaultColors = generateColors(5);
    return {
      labels: ["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"],
      datasets: [
        {
          label: "Số lượng đánh giá",
          data: [0, 0, 0, 0, 0],
          backgroundColor: defaultColors,
          borderColor: defaultColors,
          borderWidth: 1,
        },
      ],
    };
  }

  // Sắp xếp phân phối đánh giá theo số sao (1-5)
  const sortedDistribution = [...reviewsData.data.ratingDistribution].sort(
    (a, b) => a.rating - b.rating
  );

  const colors = generateColors(sortedDistribution.length);

  return {
    labels: sortedDistribution.map((item) => `${item.rating} sao`),
    datasets: [
      {
        label: "Số lượng đánh giá",
        data: sortedDistribution.map((item) => item.count),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };
};

// Transform revenue data for bar chart
export const getRevenueChartData = (revenueData, filterBy) => {
  if (!revenueData?.data) {
    return {
      labels: [],
      datasets: [
        {
          label: "Doanh thu (triệu VND)",
          data: [],
          backgroundColor: generateColors(1)[0],
        },
      ],
    };
  }

  const labels = revenueData.data.map((item) => {
    if (filterBy === "month") {
      return item.month;
    } else if (filterBy === "year") {
      return item.year;
    } else if (filterBy === "week") {
      return `Tử ${item.startDate} đến ${item.endDate}`;
    } else if (filterBy === "day") {
      return item.formattedDate;
    }
    return "";
  });

  return {
    labels,
    datasets: [
      {
        label: "Doanh thu (triệu VND)",
        data: revenueData.data.map((item) => item.revenue),
        backgroundColor: generateColors(1)[0],
      },
    ],
  };
};

// Transform product distribution data for pie chart
export const getProductDistributionData = (productDistributionData) => {
  if (!productDistributionData?.data?.topProducts) {
    return {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    };
  }

  const hasOthers = !!productDistributionData.data.othersPercentage;
  
  const labels = hasOthers
    ? productDistributionData.data.topProducts
        .map((item) => item.name)
        .concat("Các sản phẩm khác")
    : productDistributionData.data.topProducts.map((item) => item.name);

  const data = hasOthers
    ? productDistributionData.data.topProducts
        .map((item) => item.percentage)
        .concat(productDistributionData.data.othersPercentage)
    : productDistributionData.data.topProducts.map((item) => item.percentage);

  return {
    labels,
    datasets: [
      {
        data,
        backgroundColor: generateColors(labels.length),
      },
    ],
  };
};

// Transform brand market share data for doughnut chart
export const getBrandMarketShareData = (brandMarketShareData) => {
  if (!brandMarketShareData?.data?.brands) {
    return {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    };
  }

  return {
    labels: brandMarketShareData.data.brands.map((item) => item.name),
    datasets: [
      {
        data: brandMarketShareData.data.brands.map(
          (item) => item.marketSharePercentage
        ),
        backgroundColor: generateColors(
          brandMarketShareData.data.brands.length
        ),
      },
    ],
  };
};

// Transform order by region data for polar area chart
export const getOrderByRegionData = (orderByRegionData) => {
  if (!orderByRegionData?.data?.topCities) {
    return {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    };
  }

  return {
    labels: orderByRegionData.data.topCities.map((item) => item.provinceName),
    datasets: [
      {
        data: orderByRegionData.data.topCities.map((item) => item.count),
        backgroundColor: generateColors(
          orderByRegionData.data.topCities.length
        ),
      },
    ],
  };
};
