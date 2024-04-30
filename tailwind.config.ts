import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",

    // Path to Tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        // light mode
        tremor: {
          brand: {
            faint: "#0B1229",
            muted: colors.amber[500],
            subtle: colors.amber[500],
            DEFAULT: colors.amber[500],
            emphasis: colors.amber[400],
            inverted: colors.amber[950],
          },
          background: {
            muted: "#131A2B",
            subtle: colors.slate[900],
            DEFAULT: colors.slate[700],
            emphasis: colors.slate[300],
            strong: colors.slate[900],
          },
          border: {
            DEFAULT: colors.slate[600],
            accent: colors.amber[500],
          },
          ring: {
            DEFAULT: colors.slate[600],
            accent: colors.amber[500],
          },
          content: {
            subtle: colors.slate[500],
            DEFAULT: colors.slate[100],
            emphasis: colors.slate[100],
            strong: colors.slate[50],
            inverted: colors.slate[950],
            accent: colors.amber[500],
          },
        },
        // dark mode
        /*  "dark-tremor": {
          brand: {
            faint: "#0B1229",
            muted: colors.amber[500],
            subtle: colors.amber[500],
            DEFAULT: colors.amber[500],
            emphasis: colors.amber[400],
            inverted: colors.amber[950],
          },
          background: {
            muted: "#131A2B",
            subtle: colors.slate[900],
            DEFAULT: colors.slate[700],
            emphasis: colors.slate[300],
            strong: colors.slate[900],
          },
          border: {
            DEFAULT: colors.slate[600],
            accent: colors.amber[500],
          },
          ring: {
            DEFAULT: colors.slate[600],
            accent: colors.amber[500],
          },
          content: {
            subtle: colors.slate[500],
            DEFAULT: colors.slate[100],
            emphasis: colors.slate[100],
            strong: colors.slate[50],
            inverted: colors.slate[950],
            accent: colors.amber[500],
          },
        }, */
      },
      boxShadow: {
        // light
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        // dark
        "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "dark-tremor-card":
          "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "dark-tremor-dropdown":
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require("@headlessui/tailwindcss"), require("@tailwindcss/forms")],
};

export default config;
