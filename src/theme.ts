import {extendTheme} from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        blue: {
            100: "#e3f2fd",
            200: "#bbdefb",
            300: "#90caf9",
            400: "#64b5f6",
            500: "#42a5f5",
            600: "#1e88e5",
            700: "#1976d2",
            800: "#1565c0",
            900: "#0d47a1",
        },
        grey: {
            50: "#ffffff",
            100: "#f5f5f5",
            200: "#eeeeee",
            300: "#e0e0e0",
            400: "#bdbdbd",
            500: "#9e9e9e",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
        },
        yellow: {
            50: "#FFFFF0",
            100: "#FEFCBF",
            200: "#FAF089",
            300: "#F6E05E",
            400: "#ECC94B",
            500: "#D69E2E",
            600: "#B7791F",
            700: "#975A16",
            800: "#744210",
            900: "#5F370E",
        },
        red: {
            50: "#FFF5F5",
            100: "#FED7D7",
            200: "#FEB2B2",
            300: "#FC8181",
            400: "#F56565",
            500: "#E53E3E",
            600: "#C53030",
            700: "#9B2C2C",
            800: "#822727",
            900: "#63171B",
        },
        green: {
            50: "#F0FFF4",
            100: "#C6F6D5",
            200: "#9AE6B4",
            300: "#68D391",
            400: "#48BB78",
            500: "#38A169",
            600: "#2F855A",
            700: "#276749",
            800: "#22543D",
            900: "#1C4532",
        }
    },
    fonts: {
        heading: "'Roboto', sans-serif",
        body: "'Roboto', sans-serif",
    },
    styles: {
        global: {
            body: {
                fontFamily: "'Roboto', sans-serif",
            },
            h1: {
                fontFamily: "'Roboto', sans-serif",
            },
            h2: {
                fontFamily: "'Roboto', sans-serif",
            },
            h3: {
                fontFamily: "'Roboto', sans-serif",
            },
            h4: {
                fontFamily: "'Roboto', sans-serif",
            },
            h5: {
                fontFamily: "'Roboto', sans-serif",
            },
            h6: {
                fontFamily: "'Roboto', sans-serif",
            },
        },
    },
});

export default theme;