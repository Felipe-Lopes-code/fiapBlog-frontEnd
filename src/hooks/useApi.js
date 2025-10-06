import { useState } from 'react';

// Hook genérico para encapsular a lógica de chamadas de API
export const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const request = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc(...args);
      setData(result.data);
      return result.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Ocorreu um erro inesperado.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, request };
};