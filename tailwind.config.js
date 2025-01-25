/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // global colors
        ltColor1: "var(--color-ltColor1)",
        ltColorLight: "var(--color-ltColorLight)",
        ltColorDark: "var(--color-ltColorDark)",
        ltColorDarker: "var(--color-ltColorDarker)",
        ltColorDarker1: "var(--color-ltColorDarker1)",
        ltColor2: "var(--color-ltColor2)",
        ltColor3: "var(--color-ltColor3)",
        ltColorGray: "var(--color-ltColorGray)",
        ltColorInput: "var(--color-ltColorInput)", 
        // theme-specific
        bgPrimary: "var(--color-bgPrimary)",
        bgSecondary: "var(--color-bgSecondary)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        secondaryTransparent: "var(--color-secondaryTransparent)",
        tertiary: "var(--color-tertiary)",
        quaternary: "var(--color-quaternary)",
        quinary: "var(--color-quinary)",
        primaryText: "var(--color-primaryText)",
        secondaryText: "var(--color-secondaryText)",
        tertiaryText: "var(--color-tertiaryText)",
        quaternaryText: "var(--color-quaternaryText)",
        quinaryText: "var(--color-quinaryText)",
      },
      fontFamily: {
        sans: ['Comic Sans MS', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
