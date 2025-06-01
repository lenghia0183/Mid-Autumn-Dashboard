import { generateColors } from "./chartUtils";

// Helper function to format date to Vietnamese style
const formatDateToVietnamese = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Return original if invalid date

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day} tháng ${month} năm ${year}`;
};

// Helper function to format date range
const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return "N/A";

  if (startDate === endDate) {
    return formatDateToVietnamese(startDate);
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return `${startDate} - ${endDate}`;
  }

  const startDay = start.getDate();
  const startMonth = start.getMonth() + 1;
  const startYear = start.getFullYear();
  const endDay = end.getDate();
  const endMonth = end.getMonth() + 1;
  const endYear = end.getFullYear();

  if (startYear === endYear && startMonth === endMonth) {
    return `${startDay} - ${endDay} tháng ${startMonth} năm ${startYear}`;
  } else if (startYear === endYear) {
    return `${startDay} tháng ${startMonth} - ${endDay} tháng ${endMonth} năm ${startYear}`;
  } else {
    return `${startDay} tháng ${startMonth} năm ${startYear} - ${endDay} tháng ${endMonth} năm ${endYear}`;
  }
};

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
      return formatDateToVietnamese(item.date);
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
  if (!revenueData?.data || !Array.isArray(revenueData.data)) {
    return {
      labels: [],
      datasets: [
        {
          label: "Doanh thu (VND)",
          data: [],
          backgroundColor: "#00796B",
        },
        {
          label: "Lợi nhuận (VND)",
          data: [],
          backgroundColor: "#4CAF50",
        },
      ],
    };
  }

  const labels = revenueData.data.map((item) => {
    if (filterBy === "month") {
      return `Tháng ${item.month}/${item.year}`;
    } else if (filterBy === "year") {
      return `Năm ${item.year}`;
    } else if (filterBy === "week") {
      return `Tuần ${item.week}/${item.year}`;
    } else if (filterBy === "day") {
      // Format ngày theo kiểu "ngày tháng năm"
      if (item.formattedDate) {
        return item.formattedDate;
      }
      // Fallback: format từ startDate nếu có
      if (item.startDate) {
        return formatDateToVietnamese(item.startDate);
      }
    }

    // Fallback cho các trường hợp khác
    if (item.formattedDate) {
      return item.formattedDate;
    }
    if (item.startDate && item.endDate) {
      return formatDateRange(item.startDate, item.endDate);
    }

    return "N/A";
  });

  const colors = generateColors(2);

  return {
    labels,
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: revenueData.data.map((item) => item.revenue || 0),
        backgroundColor: colors[0],
        borderColor: colors[0],
        borderWidth: 1,
      },
      {
        label: "Lợi nhuận (VND)",
        data: revenueData.data.map((item) => item.profit || 0),
        backgroundColor: colors[1],
        borderColor: colors[1],
        borderWidth: 1,
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
