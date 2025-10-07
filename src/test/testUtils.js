import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProviderWrapper } from '../styles/ThemeProvider';
import { AuthProvider } from '../context/AuthContext';

export const renderWithProviders = (component, options = {}) => {
  const { initialRoute = '/' } = options;
  
  // Define a rota inicial
  window.history.pushState({}, 'Test Page', initialRoute);

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

export const mockUser = {
  professor: {
    id: 1,
    name: "Maria Silva",
    email: "maria.silva@fiap.com.br",
    role: "PROFESSOR"
  },
  student: {
    id: 3,
    name: "João Aluno",
    email: "joao.aluno@fiap.com.br",
    role: "STUDENT"
  }
};

export const mockPosts = [
  {
    id: 1,
    title: "Test Post 1",
    content: "Test content 1",
    author: "Test Author 1",
    comments: []
  },
  {
    id: 2,
    title: "Test Post 2",
    content: "Test content 2",
    author: "Test Author 2",
    comments: [
      {
        id: 1,
        content: "Test comment",
        author: "Test Commenter"
      }
    ]
  }
];