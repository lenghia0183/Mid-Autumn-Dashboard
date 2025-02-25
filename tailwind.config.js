import { breakpoints } from "./src/config/breakpointConfig";
import {
  colors,
  bgColorSafelist,
  textColorSafelist,
  borderColorSafelist,
  hoverBgColorSafelist,
  hoverTextColorSafelist,
  hoverBorderColorSafelist,
} from "./src/config/colorConfig";
import { durations, durationSafelist } from "./src/config/durationConfig";

export default {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx}"],
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  safelist: [
    ...durationSafelist,
    ...textColorSafelist,
    ...borderColorSafelist,
    ...bgColorSafelist,
    ...hoverBgColorSafelist,
    ...hoverTextColorSafelist,
    ...hoverBorderColorSafelist,
  ],
  theme: {
    screen: {
      screens: {
        ...breakpoints,
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },

    extend: {
      fontFamily: {
        barlow: ['"Barlow"', "sans-serif"],
        sourceSansPro: ['"Source Sans Pro"', "sans-serif"],
      },

      keyframes: {
        "slide-horizontal": {
          "0%": { transform: "translateX(0%) translateY(-50%)" },
          "50%": { transform: "translateX(-20%) translateY(-50%)" },
          "100%": { transform: "translateX(0%) translateY(-50%)" },
        },
      },
      animation: {
        "slide-horizontal": "slide-horizontal 10s ease-in-out infinite",
      },

      colors: {
        ...colors,
      },
      transitionDuration: {
        ...durations,
      },
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "4/5": "80%",
      },
    },
  },
  plugins: [],
};
