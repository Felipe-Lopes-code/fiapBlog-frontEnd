import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAuthApi } from '../api/mockAuthApi';

const AuthContext = createContext();

const TOKEN_KEY = '@FiapBlog:token';

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    isLoading: true
  });

  // Verificar token salvo ao iniciar
  useEffect(() => {
    const loadStoredAuth = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        try {
          const user = await mockAuthApi.validateToken(storedToken);
          setAuthState({
            isAuthenticated: true,
            user,
            accessToken: storedToken,
            isLoading: false
          });
        } catch (error) {
          console.error('Token inválido:', error);
          localStorage.removeItem(TOKEN_KEY);
          setAuthState({
            isAuthenticated: false,
            user: null,
            accessToken: null,
            isLoading: false
          });
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadStoredAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { user, token } = await mockAuthApi.login(email, password);
      localStorage.setItem(TOKEN_KEY, token);
      setAuthState({ 
        isAuthenticated: true, 
        user, 
        accessToken: token,
        isLoading: false
      });
      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthState({ 
      isAuthenticated: false, 
      user: null, 
      accessToken: null,
      isLoading: false
    });
  };

  // Funções de verificação de permissões
  const canReadPosts = () => mockAuthApi.canReadPosts(authState.user);
  const canCreatePosts = () => mockAuthApi.canCreatePosts(authState.user);
  const canEditPosts = () => mockAuthApi.canEditPosts(authState.user);
  const canDeletePosts = () => mockAuthApi.canDeletePosts(authState.user);
  const canAddComments = () => mockAuthApi.canAddComments(authState.user);
  const hasPermission = (action) => mockAuthApi.hasPermission(authState.user, action);

  const value = { 
    ...authState, 
    login, 
    logout,
    canReadPosts,
    canCreatePosts,
    canEditPosts,
    canDeletePosts,
    canAddComments,
    hasPermission
  };

  if (authState.isLoading) {
    return <div>Carregando...</div>; // Ou um componente de loading mais elaborado
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);