/**
 * Design Tokens - Shared across Portfolio and Resume
 * Centralized color, typography, and spacing configuration
 */

export const colors = {
  // Primary
  primary: '#0F172A',
  secondary: '#1E293B',
  tertiary: '#64748B',

  // Accent
  accent: '#3B82F6',
  accentLight: '#60A5FA',
  accentDark: '#1D4ED8',

  // Neutrals
  white: '#FFFFFF',
  lightGray: '#F8FAFC',
  gray: '#E2E8F0',
  darkGray: '#CBD5E1',

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#0EA5E9',
}

export const typography = {
  fontSans: ['Inter', 'system-ui', 'sans-serif'],
  fontMono: ['Fira Code', 'Menlo', 'monospace'],
  
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },

  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
}

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '6rem',
}

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
}

export const borderRadius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
}
