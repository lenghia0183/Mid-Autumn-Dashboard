const colors = {
  crimson: {
    DEFAULT: "#c1322f",
    100: "#d05454",
    200: "#d97a7a",
    300: "#de9f9f",
    400: "#e4c4c4",
    500: "#ebdddd",
    hover: "#d05454",
  },
  blue: {
    DEFAULT: "#007BFF",
    100: "#cce4ff",
    200: "#99c9ff",
    300: "#66adff",
    400: "#3392ff",
    500: "#007BFF",
    600: "#0069e1",
    700: "#0058c3",
    800: "#0046a5",
    900: "#003387",
    hover: "#3392ff",
  },
  emerald: {
    DEFAULT: "#005957",
    50: "#13b093",
    100: "#006f68",
    200: "#00827f",
    300: "#009493",
    400: "#00a7a8",
    500: "#00bcb1",
    hover: "#006f68",
  },
  dark: {
    DEFAULT: "#292929",
    100: "#e5e5e5",
    200: "#cccccc",
    300: "#b2b2b2",
    400: "#999999",
    500: "#808080",
    600: "#666666",
    700: "#4d4d4d",
    800: "#333333",
    900: "#1a1a1a",
    hover: "#6a6a6a",
  },
  white: {
    DEFAULT: "#f5f3eb",
    100: "#ffffff",
    200: "#e8e5d7",
    300: "#d9d2be",
    400: "#cbc0a6",
    500: "#faf7f2",
    hover: "#f5f3eb",
  },
  yellow: {
    DEFAULT: "#f7a825",
    100: "#f9c85b",
    200: "#f9d95f",
    300: "#f7e54d",
    400: "#f7ec8b",
    500: "#ffb307",
    hover: "#f9c85b",
  },
  facebook: {
    DEFAULT: "#3b5998",
  },
  google: {
    DEFAULT: "#dc4e41",
  },
};

const colorMap = Object.keys(colors).reduce((map, color) => {
  const shades = Object.keys(colors[color]);
  shades.forEach((shade) => {
    const className = shade === "DEFAULT" ? color : `${color}-${shade}`;
    map.push(className);
  });
  return map;
}, []);

const bgColorSafelist = colorMap.map((colorClass) => `bg-${colorClass}`);
const textColorSafelist = colorMap.map((colorClass) => `text-${colorClass}`);
const borderColorSafelist = colorMap.map(
  (colorClass) => `border-${colorClass}`
);
const hoverBgColorSafelist = colorMap.map(
  (colorClass) => `hover:bg-${colorClass}`
);

const hoverTextColorSafelist = colorMap.map(
  (colorClass) => `hover:text-${colorClass}`
);

const hoverBorderColorSafelist = colorMap.map(
  (colorClass) => `hover:border-${colorClass}`
);

export {
  colors,
  bgColorSafelist,
  textColorSafelist,
  borderColorSafelist,
  hoverBgColorSafelist,
  hoverTextColorSafelist,
  hoverBorderColorSafelist,
};
