const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0c2d1c",
        "primaryColor-800": "#154732",
        "primaryColor-700":"#1b563e",
        "secondaryColor":"#ffeccc"
      },
      fontFamily: {
        sans: ['"Lexend"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    styled: true,
    base: true,
    themes: [
      {
        mytheme: {
          primary: "#0c2d1c",

          secondary:"#ffeccc",

          "base-100": "#e8c497",
        },
      },
    ],
  },
};
