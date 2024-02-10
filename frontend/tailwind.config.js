const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0c2d1c",
        "primaryColor-800": "#154732",
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

          "base-100": "#e8c497",
        },
      },
    ],
  },
};
