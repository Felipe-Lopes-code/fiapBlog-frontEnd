import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authHooks';
import HomePage from '../pages/HomePage';
import PostPage from '../pages/PostPage';
import CreatePostPage from '../pages/CreatePostPage';
import EditPostPage from '../pages/EditPostPage';
import AdminPage from '../pages/AdminPage';
import LoginPage from '../pages/LoginPage';

const _PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const ProfessorRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return user?.role === "PROFESSOR" ? children : <Navigate to="/" />;
};

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/create"
        element={
          <ProfessorRoute>
            <CreatePostPage />
          </ProfessorRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <ProfessorRoute>
            <EditPostPage />
          </ProfessorRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProfessorRoute>
            <AdminPage />
          </ProfessorRoute>
        }
      />
    </Routes>
  );
};