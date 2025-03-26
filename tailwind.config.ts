import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  important: "#app",
  theme: {
    extend: {
      width: {
        view: "1232px"
      },
      maxWidth: {
        view: "1232px"
      },
      fontSize: {
        ten: "10px"
      },
      fontFamily: {
        manrope: ["var(--font-manrope)"],
        orbitron: ["var(--font-orbitron)"],
        baloo2: ["var(--font-baloo2)"],
        inter: ["var(--font-inter)"]
      },
      colors: {
        bg1: "hsl(var(--bg1))",
        bg: {
          popup: "hsl(var(--bg-popup))",
          tag: "hsl(var(--bg-tag))",
          mask: "hsl(var(--bg-mask))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          blue: "hsl(var(--primary-blue))"
        },
        secondary: "hsl(var(--secondary))",
        tertary: "hsl(var(--tertary))",
        disable: "hsl(var(--disable))",
        link: "hsl(var(--link))",

        icon: "hsl(var(--icon))",
        line: "hsl(var(--line))",
        "gold-yellow": "hsl(var(--gold-yellow))",
        error: "hsl(var(--error))",
        success: "hsl(var(--success))"
      }
    }
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("child", "&>*");
      addVariant("child-hover", "& > *:hover");
    }),
    require("./tailwind-sonic")
  ],
  corePlugins: {
    preflight: false
  }
};
export default config;
