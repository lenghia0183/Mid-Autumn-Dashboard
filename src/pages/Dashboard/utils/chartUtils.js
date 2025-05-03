// Color constants for charts
export const COLORS = {
  primary: "#00796B", // Xanh nhạt hơn
  yellow: "#FFD54F", // Vàng nhạt
  orange: "#FFB74D", // Cam nhạt
  red: "#E57373", // Đỏ nhạt
  gray: "#BDBDBD", // Xám nhạt
  green: "#00C853", // Xanh lá nhạt
};

// Hàm tạo màu sắc động không bị lặp lại
export const generateColors = (count) => {
  // Mảng màu cơ bản từ COLORS
  const baseColors = Object.values(COLORS);

  // Nếu số lượng cần ít hơn hoặc bằng số màu có sẵn, trả về số lượng màu cần thiết
  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }

  // Nếu cần nhiều màu hơn, tạo thêm màu mới bằng cách điều chỉnh độ sáng và độ bão hòa
  const colors = [...baseColors];

  // Tạo thêm màu cho đến khi đủ số lượng cần thiết
  while (colors.length < count) {
    // Tạo màu mới bằng cách thay đổi độ sáng của các màu cơ bản
    const hue = Math.floor(Math.random() * 360); // Giá trị màu sắc (0-360)
    const saturation = 70 + Math.floor(Math.random() * 30); // Độ bão hòa (70-100%)
    const lightness = 40 + Math.floor(Math.random() * 40); // Độ sáng (40-80%)

    const newColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    // Kiểm tra xem màu mới có trùng với màu nào trong mảng không
    if (!colors.includes(newColor)) {
      colors.push(newColor);
    }
  }

  return colors;
};

// Common filter options for all charts
export const filterOptions = [
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
