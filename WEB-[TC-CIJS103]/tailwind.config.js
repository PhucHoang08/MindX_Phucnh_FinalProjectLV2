/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js" // ✅ đường dẫn này là bắt buộc
  ],
  theme: {
    extend: {
      fontFamily: {
        maxtield:['Maxtield','sans-serif'],
        pramukhrounded:['PramukhRounded','sans-serif'],
        futura:['Futura','sans-serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin') // ✅ đúng cách dùng plugin
  ],
};
