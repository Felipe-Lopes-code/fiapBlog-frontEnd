import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

export const ThemeProviderWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);