/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Enables class-based dark mode
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem", // Sets container padding to 2rem
      screens: {
        "2xl": "1400px", // Customize for 2xl screens
      },
    },
    extend: {
      colors: {
        // Custom color utilities based on HSL values
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // Customize border radius to be based on variables for flexibility
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Keyframe animations for custom UI effects like accordion and shine
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "shine": {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
      // Animation definitions, adjusting timing and ease
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shine": "shine 8s ease-in-out infinite", // Shine animation for modern UI effects
      },
      // Custom font families for flexibility
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      // Extend spacing to include custom gaps and margins
      spacing: {
        '1/2': '50%',
        '1/4': '25%',
        '3/4': '75%',
        'screen': '100vh', // Ensure full screen height
      },
      // Custom box-shadow styles
      boxShadow: {
        'xl': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)',
        'card': '0 2px 5px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Animate plugin for smooth animations
  ],
}
