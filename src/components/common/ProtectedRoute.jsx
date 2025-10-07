import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  requireProfessor = false 
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (requireAuth && !isAuthenticated) {
    // Redireciona para o login, salvando a página que o usuário tentou acessar
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireProfessor && (!user || user.role !== "PROFESSOR")) {
    // Redireciona para a home se não for professor
    return <Navigate to="/" replace />;
  }

  return children;
};