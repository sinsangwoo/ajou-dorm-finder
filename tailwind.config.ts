import type { Config } from "tailwindcss";

/**
 * Ajou University Design System — Tailwind Config
 * ─────────────────────────────────────────────────
 * Primary brand colors:
 *   Navy   #002855  Pantone 289 (official dark blue)
 *   Blue   #0057B7  Pantone 285 (official medium blue)
 *   Gold   #C5A028  Pantone 874 (official gold)
 */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      // ── Font scale (minor-third ratio, base 15px) ──
      fontSize: {
        "2xs": ["0.625rem",  { lineHeight: "1rem" }],
        xs:   ["0.6875rem", { lineHeight: "1.125rem" }],
        sm:   ["0.8125rem", { lineHeight: "1.375rem" }],
        base: ["0.9375rem", { lineHeight: "1.6rem" }],
        lg:   ["1.0625rem", { lineHeight: "1.75rem" }],
        xl:   ["1.1875rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.375rem",  { lineHeight: "2rem" }],
        "3xl": ["1.75rem",   { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem",   { lineHeight: "2.75rem" }],
        "5xl": ["3rem",      { lineHeight: "1.1" }],
        "6xl": ["3.75rem",   { lineHeight: "1.05" }],
        "7xl": ["4.5rem",    { lineHeight: "1" }],
      },

      // ── Color palette ──
      colors: {
        // Semantic tokens (CSS var → HSL)
        border:     "hsl(var(--border))",
        input:      "hsl(var(--input))",
        ring:       "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          // Named shades (used for direct references)
          50:  "hsl(213 100% 97%)",
          100: "hsl(213 100% 93%)",
          200: "hsl(213 100% 85%)",
          300: "hsl(213 90%  70%)",
          400: "hsl(213 85%  55%)",
          500: "hsl(213 80%  40%)",  // ~#0057B7
          600: "hsl(213 90%  30%)",
          700: "hsl(213 100% 22%)",  // ~#002F6C
          800: "hsl(213 100% 17%)",  // ~#002155
          900: "hsl(213 100% 12%)",  // ~#002855 (Navy)
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT:                "hsl(var(--sidebar-background))",
          foreground:             "hsl(var(--sidebar-foreground))",
          primary:                "hsl(var(--sidebar-primary))",
          "primary-foreground":   "hsl(var(--sidebar-primary-foreground))",
          accent:                 "hsl(var(--sidebar-accent))",
          "accent-foreground":    "hsl(var(--sidebar-accent-foreground))",
          border:                 "hsl(var(--sidebar-border))",
          ring:                   "hsl(var(--sidebar-ring))",
        },

        // ── Ajou brand palette ──
        ajou: {
          navy:   "#002855",   // Pantone 289 — primary identity
          blue:   "#0057B7",   // Pantone 285 — secondary identity
          gold:   "#C5A028",   // Pantone 874 — accent
          // Tints (white mix)
          "navy-50":  "#E6EBF1",
          "navy-100": "#BFCCD9",
          "navy-200": "#8AAAC0",
          "navy-400": "#2D6291",
          "navy-600": "#001E42",
          "blue-50":  "#E6EEFA",
          "blue-100": "#BACEEF",
          "blue-200": "#7EA2DA",
          "blue-300": "#3D7AC6",
          "gold-50":  "#FAF4E4",
          "gold-100": "#EEE0B6",
          "gold-200": "#DFCA7C",
          "gold-600": "#9A7C1E",
          // Semantic aliases (CSS var bridge for dark mode)
          DEFAULT: "hsl(var(--ajou-blue))",
          light:   "hsl(var(--ajou-blue-light))",
          dark:    "hsl(var(--ajou-blue-dark))",
        },

        // ── Status colors ──
        success: {
          DEFAULT: "hsl(var(--success))",
          50:  "#F0FDF4",
          100: "#DCFCE7",
          500: "#16A34A",
          600: "#15803D",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          50:  "#FFFBEB",
          100: "#FEF3C7",
          500: "#D97706",
          600: "#B45309",
        },
        error: {
          DEFAULT: "#DC2626",
          50:  "#FEF2F2",
          100: "#FEE2E2",
          500: "#EF4444",
        },

        // ── Score level colors ──
        score: {
          excellent: "#16A34A",
          good:      "#0057B7",
          average:   "#D97706",
          low:       "#DC2626",
        },
      },

      // ── Border radius ──
      borderRadius: {
        none: "0",
        sm:   "calc(var(--radius) - 4px)",   // 8px
        DEFAULT: "var(--radius)",             // 12px
        md:   "calc(var(--radius) - 2px)",   // 10px
        lg:   "var(--radius)",               // 12px
        xl:   "calc(var(--radius) + 4px)",   // 16px
        "2xl": "calc(var(--radius) + 8px)",  // 20px
        "3xl": "calc(var(--radius) + 12px)", // 24px
        full: "9999px",
      },

      // ── Animations ──
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up-fade": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.7" },
        },
        "score-pop": {
          "0%":   { transform: "scale(0.85)", opacity: "0" },
          "60%":  { transform: "scale(1.04)" },
          "100%": { transform: "scale(1)",    opacity: "1" },
        },
        "gold-shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        "fade-in-up":      "fade-in-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in":         "fade-in 0.4s ease-out forwards",
        "slide-down":      "slide-down 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up-fade":   "slide-up-fade 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-in":        "scale-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        shimmer:           "shimmer 2.5s linear infinite",
        "pulse-subtle":    "pulse-subtle 3s ease-in-out infinite",
        "score-pop":       "score-pop 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "gold-shimmer":    "gold-shimmer 3s linear infinite",
      },

      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
        bounce: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      },

      backdropBlur: {
        xs: "2px",
      },

      // ── Box shadows ──
      boxShadow: {
        soft:       "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 4px 12px 0 rgb(0 0 0 / 0.03)",
        card:       "0 2px 8px -2px rgb(0 0 0 / 0.06), 0 8px 24px -4px rgb(0 0 0 / 0.04)",
        "card-hover": "0 4px 16px -4px rgb(0 0 0 / 0.10), 0 12px 36px -8px rgb(0 0 0 / 0.06)",
        "glow-navy": "0 0 24px -4px rgba(0, 40, 85, 0.25)",
        "glow-blue": "0 0 24px -4px rgba(0, 87, 183, 0.22)",
        "glow-gold": "0 0 24px -4px rgba(197, 160, 40, 0.30)",
        nav:        "0 1px 0 0 hsl(213 15% 91%), 0 4px 16px -4px rgb(0 0 0 / 0.06)",
        score:      "inset 0 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px -4px rgba(0, 40, 85, 0.3)",
      },

      // ── Spacing extras ──
      spacing: {
        "nav": "64px",
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
