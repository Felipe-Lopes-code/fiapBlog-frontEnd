import React, { createContext, useContext, useState } from 'react';

// =============================================================================
// SEÇÃO 2: ESTADO GLOBAL E AUTENTICAÇÃO (CONTEXT API)
// =============================================================================

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    accessToken: null,
  });

  const login = (userData, token) => {
    setAuthState({ isAuthenticated: true, user: userData, accessToken: token });
  };
  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null, accessToken: null });
    window.location.hash = '#/';
  };
  const value = { ...authState, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);