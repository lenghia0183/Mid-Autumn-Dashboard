// durationConfig.js

const durations = {
  0: "0ms",
  75: "75ms",
  100: "100ms",
  150: "150ms",
  200: "200ms",
  300: "300ms",
  500: "500ms",
  1000: "1000ms",
  2000: "2000ms",
  3000: "3000ms",
  4000: "4000ms",
  5000: "5000ms",
};

const durationMap = Object.fromEntries(
  Object.entries(durations).map(([key]) => [key, `duration-${key}`])
);

const durationSafelist = Object.values(durationMap);

export { durations, durationMap, durationSafelist };
