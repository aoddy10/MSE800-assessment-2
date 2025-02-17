/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                primary: "#31AAB7",
                secondary: "#767676",
                accent: "#31AAB7",
                background: "#F9F9FB",
                text: "#232323",
            },
            fontFamily: {
                bold: ["LatoBold", "sans-serif"],
                medium: ["LatoMedium", "sans-serif"],
                regular: ["LatoRegular", "sans-serif"],
                semibold: ["LatoSemibold", "sans-serif"],
                thin: ["LatoThin", "sans-serif"],
            },
        },
    },
    plugins: [],
};
