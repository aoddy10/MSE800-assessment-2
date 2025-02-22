/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./public/**/*.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["LatoRegular", "sans-serif"], // ✅ Ensure this matches global.css
                bold: ["LatoBold", "sans-serif"],
                medium: ["LatoMedium", "sans-serif"],
                semibold: ["LatoSemibold", "sans-serif"],
                thin: ["LatoThin", "sans-serif"],
            },
            colors: {
                primary: "#31AAB7",
                secondary: "#767676",
                accent: "#31AAB7",
                background: "#F9F9FB",
                text: "#232323",
            },
        },
    },
    plugins: [],
};
