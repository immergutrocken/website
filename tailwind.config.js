module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      content: ["Ludwig-Normal"],
      important: ["Ludwig-Bold"],
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      grasshopper: "#98CE58",
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
