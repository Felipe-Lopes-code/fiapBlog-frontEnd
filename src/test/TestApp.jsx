import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { GlobalStyles } from '../styles/GlobalStyles';
import { MainLayout } from '../components/layout/MainLayout';
import { AppRouter } from '../routes/AppRouter';
import { ThemeProviderWrapper } from '../styles/ThemeProvider';

export function TestApp() {
  return (
    <ThemeProviderWrapper>
      <AuthProvider>
        <GlobalStyles />
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </AuthProvider>
    </ThemeProviderWrapper>
  );
}