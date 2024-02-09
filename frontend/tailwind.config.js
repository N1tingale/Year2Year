module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0c2d1c",

          secondary: "#0c2d1c",

          accent: "#0c2d1c",

          neutral: "#0c2d1c",

          "base-100": "#e8c497",

          info: "#0c2d1c",

          success: "#00ffff",

          warning: "#0c2d1c",

          error: "#0c2d1c",
        },
      },
    ],
  },
};
