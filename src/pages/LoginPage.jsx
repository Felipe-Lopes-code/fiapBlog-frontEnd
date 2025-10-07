import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Card, Input, Button } from '../components/common/StyledComponents';
import { useAuth } from '../context/AuthContext';

const LoginCard = styled(Card)`
  max-width: 400px;
  margin: 100px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.danger};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const LoginHelper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const userExamples = [
    { role: 'Professor', email: 'maria.silva@fiap.com.br', password: 'senha123' },
    { role: 'Aluno', email: 'joao.aluno@fiap.com.br', password: 'senha123' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(credentials.email, credentials.password);
      navigate('/');
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <LoginCard>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit" variant="primary">
          Entrar
        </Button>
      </Form>

      <LoginHelper>
        <h3>Usuários para teste:</h3>
        {userExamples.map((user, index) => (
          <div key={index} style={{ marginTop: '10px' }}>
            <h4>{user.role}:</h4>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Senha:</strong> {user.password}</p>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setCredentials({ email: user.email, password: user.password })}
            >
              Preencher dados de {user.role}
            </Button>
          </div>
        ))}
      </LoginHelper>
    </LoginCard>
  );
};

export default LoginPage;