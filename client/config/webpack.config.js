module.exports = {
    devServer: {
        hot: true, // ✅ เปิด HMR แต่ลดโหลดซ้ำ
        liveReload: false, // ✅ ปิด Live Reload ที่อาจทำให้รันซ้ำ
        watchFiles: {
            paths: ["src/**/*"],
            options: {
                ignored: /node_modules/,
                poll: 1000, // ✅ ป้องกันการแจ้งเตือนเร็วเกินไปจาก Docker
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules\/(?!i18next-browser-languagedetector)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
};
