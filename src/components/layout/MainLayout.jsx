import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/StyledComponents';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Main = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

export const MainLayout = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <LayoutContainer>
      <Header>
        <Nav>
          <StyledLink to="/">
            <h1>FIAP Blog</h1>
          </StyledLink>
          <NavLinks>
            {isAuthenticated ? (
              <>
                <StyledLink to="/admin">Admin</StyledLink>
                <StyledLink to="/create">Novo Post</StyledLink>
                <Button variant="primary" onClick={handleLogout}>
                  Sair
                </Button>
              </>
            ) : (
              <StyledLink to="/login">Login</StyledLink>
            )}
          </NavLinks>
        </Nav>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <p>© {new Date().getFullYear()} FIAP Blog. Todos os direitos reservados.</p>
      </Footer>
    </LayoutContainer>
  );
};