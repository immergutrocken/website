module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grasshopper: "#98CE58",
      },
    },
    fontFamily: {
      content: ["Ludwig-Normal"],
      important: ["Ludwig-Bold"],
    },
  },
  plugins: [],
};
