module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFF",
        secondary: "#000",
        tertiary: "#FF571D",
      },
      invert: {
        partner: "1",
      },
    },
    fontFamily: {
      content: ["Ludwig-Normal"],
      important: ["Ludwig-Bold"],
      icon: ["Font Awesome Free"],
    },
  },
  plugins: [],
};
