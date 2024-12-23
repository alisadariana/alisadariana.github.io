/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  // darkMode: 'class', // for manual dark mode control
  theme: {
    extend: {
      /**
       * Layout constraints
       */
      maxWidth: {
        container: '1200px',
      },

      /**
       * Color system
       * Primary: Main brand color with variations
       * Text: Typography color scale
       * Border: Border color variations
       * Background: Surface color variations
       * Status: Semantic colors for different states
       */
      colors: {
        primary: {
          DEFAULT: '#0d9488',
          dark: '#0f766e',
          light: '#14b8a6',
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        text: {
          DEFAULT: '#0f172a',
          secondary: '#64748b',
          light: '#94a3b8',
          muted: '#cbd5e1',
        },
        border: {
          DEFAULT: '#f1f5f9',
          dark: '#e2e8f0',
          darker: '#cbd5e1',
        },
        background: {
          DEFAULT: '#ffffff',
          alt: '#f8fafc',
          darker: '#f1f5f9',
        },
        status: {
          success: {
            DEFAULT: '#059669',
            light: '#10b981',
            dark: '#047857',
          },
          error: {
            DEFAULT: '#dc2626',
            light: '#ef4444',
            dark: '#b91c1c',
          },
          warning: {
            DEFAULT: '#d97706',
            light: '#f59e0b',
            dark: '#b45309',
          },
          info: {
            DEFAULT: '#0ea5e9',
            light: '#38bdf8',
            dark: '#0284c7',
          },
        },
      },

      /**
       * Spacing system
       * Consistent scale for margins, padding, and gaps
       */
      spacing: {
        xs: '0.25rem', // 4px
        sm: '0.5rem', // 8px
        md: '1rem', // 16px
        lg: '1.5rem', // 24px
        xl: '2rem', // 32px
        '2xl': '2.5rem', // 40px
        '3xl': '3rem', // 48px
      },

      /**
       * Border radius scale
       */
      borderRadius: {
        none: '0',
        sm: '0.25rem', // 4px
        DEFAULT: '0.375rem', // 6px
        md: '0.5rem', // 8px
        lg: '0.75rem', // 12px
        xl: '1rem', // 16px
        full: '9999px',
      },

      /**
       * Typography scale
       * Font sizes with corresponding line heights
       */
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },

      /**
       * Shadow scale
       */
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },

      /**
       * Animation variants
       */
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
};
