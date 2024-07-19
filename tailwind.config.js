/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sofia: ["Sofia_400Regular"],
        roboto_light_italic: ["Roboto_300Light_Italic"],
        roboto_regular: ["Roboto_400Regular"],
        roboto_medium: ["Roboto_500Medium"],
        roboto_bold: ["Roboto_700Bold"],
      },
    },
  },
  plugins: [],
};
