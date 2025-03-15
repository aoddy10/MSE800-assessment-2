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
            screens: {
                '430px': '430px',
            },
            colors: {
                primary: "#31AAB7",
                secondary: "#767676",
                accent: "#31AAB7",
                background: "#F9F9FB",
                text: "#232323",
            },
            keyframes: {
                'fade-in-up': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateY(50px)'
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateY(0)'
                    },
                },
                'fade-in': {
                    '0%': {
                        opacity: '0'
                    },
                    '100%': {
                        opacity: '1'
                    },
                }
            },
            animation: {
                'fade-in-up': 'fade-in-up 2s ease-out',
                'fade-in': 'fade-in 1.5s ease-out'
            }
        },
    },
    plugins: [],
};
