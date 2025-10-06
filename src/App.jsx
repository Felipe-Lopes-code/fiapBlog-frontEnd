import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GlobalStyles } from './styles/GlobalStyles';
import { MainLayout } from './components/layout/MainLayout';
import { AppRouter } from './routes/AppRouter';
import { ThemeProviderWrapper } from './styles/ThemeProvider';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProviderWrapper>
        <AuthProvider>
          <GlobalStyles />
          <MainLayout>
            <AppRouter />
          </MainLayout>
        </AuthProvider>
      </ThemeProviderWrapper>
    </BrowserRouter>
  );
}
