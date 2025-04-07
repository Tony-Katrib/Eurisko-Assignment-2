/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3251D0',
        secondary: '#F5F7FF',
        danger: '#EF4444',
        dangerHover: '#DC2626',
      },
      fontSize: {
        xs: ['12px', '1rem'],
        sm: ['14px', '1.25rem'],
        base: ['16px', '1.5rem'],
        md: ['18px', '1.75rem'],
        heading: ['24px', '2rem'],
        title: ['32px', '2.5rem'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'base': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        '2xl': '64px',
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}