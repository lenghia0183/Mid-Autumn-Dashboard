// Phiên bản không có đơn vị 'px'
export const breakpointsWithoutPx = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// Tạo phiên bản có đơn vị 'px' từ phiên bản không có px
export const breakpoints = Object.fromEntries(
  Object.entries(breakpointsWithoutPx).map(([key, value]) => [
    key,
    `${value}px`,
  ])
);
