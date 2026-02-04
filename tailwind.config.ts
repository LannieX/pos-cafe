import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-kanit)", "sans-serif"], 
      },
    },
  },
};
export default config;