/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                outfit: ["Outfit", "sans-serif"],
                tinos: ["Tinos", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                white1: "#FDFDFD",
                green: "#7EBA1B",
                green2: "#86D20A",
                gray1: "#EEEEEE",
                gray2: "#DDDDDD",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [],
    },
};
