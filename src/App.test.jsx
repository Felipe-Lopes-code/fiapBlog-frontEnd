import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProviderWrapper } from './styles/ThemeProvider';
import { TestApp } from './test/TestApp';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <ThemeProviderWrapper>
        <AuthProvider>
          {component}
        </AuthProvider>
      </ThemeProviderWrapper>
    </BrowserRouter>
  );
};

describe('Testes de Segurança', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Autenticação', () => {
    it('deve redirecionar usuário não autenticado para login', () => {
      renderWithProviders(<TestApp />);
      expect(screen.getByText(/login/i)).toBeInTheDocument();
    });
  });

  describe('Controle de Acesso', () => {
    it('deve mostrar diferentes opções baseado no papel do usuário', () => {
      renderWithProviders(<TestApp />);
      expect(screen.queryByText(/criar post/i)).not.toBeInTheDocument();
    });
  });
});