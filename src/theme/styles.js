import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = {
  colors: {
    brand: {
      50: '#ccb0ec',
      100: '#b187e2',
      200: '#a472de',
      300: '#965ed9',
      400: '#8949d4',
      500: 'rgba(111, 45, 189)',
      600: '#572394',
      700: '#4b1e7f',
      800: '#3f196b',
      900: '#261041',
    },
    brandScheme: {
      50: '#f3eaf8',
      100: '#ddc3eb',
      200: '#d2b0e5',
      300: '#c79ddf',
      400: '#bc89d9',
      500: 'rgba(166, 99, 204)',
      600: '#903ebe',
      700: '#8138ab',
      800: '#733297',
      900: '#562571',
    },
    brandTabs: {
      50: '#ffffff',
      100: '#ffffff',
      200: '#ffffff',
      300: '#ffffff',
      400: '#e9fdfd',
      500: 'rgba(185, 250, 248)',
      600: '#89f7f3',
      700: '#72f5f1',
      800: '#5af3ee',
      900: '#2af0ea',
    },
    secondaryGray: {
      50: '#ffffff',
      100: '#f9f7fc',
      200: '#ebe4f6',
      300: '#ddd1ef',
      400: '#cebee9',
      500: 'rgba(178, 152, 220)',
      600: '#9672cf',
      700: '#875fc9',
      800: '#794cc2',
      900: '#6138a3',
    },
    red: {
      100: "#FEEFEE",
      500: "#EE5D50",
      600: "#E31A1A",
    },
    blue: {
      50: "#EFF4FB",
      500: "#3965FF",
    },
    orange: {
      100: "#FFF6DA",
      500: "#FFB547",
    },
    green: {
      100: "#E6FAF5",
      500: "#01B574",
    },
    navy: {
      50: '#cb96f0',
      100: '#b469ea',
      200: '#a953e7',
      300: '#9e3de4',
      400: '#9326e1',
      500: 'rgba(119, 26, 186, 1)',
      600: '#5a148d',
      700: '#4c1177',
      800: '#3e0d61',
      900: '#210734',
    },
    gray: {
      100: "#FAFCFE",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        overflowX: "hidden",
        bg: mode("secondaryGray.300", "navy.900")(props),
        fontFamily: "DM Sans",
        letterSpacing: "-0.5px",
      },
      input: {
        color: "gray.700",
      },
      html: {
        fontFamily: "DM Sans",
      },
    }),
  },
};