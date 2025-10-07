import React from 'react';
import { ThemeProvider } from 'styled-components';

export const theme = {
  colors: {
    primary: '#0D6EFD',
    background: '#F8F9FA',
    cardBg: '#FFFFFF',
    text: '#212529',
    textSecondary: '#6C757D',
    white: '#FFFFFF',
    danger: '#DC3545',
    success: '#198754',
    border: '#DEE2E6',
  },
  fonts: {
    main: 'Inter, sans-serif',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: '8px',
  shadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
};

export const ThemeProviderWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);