import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: ${theme.borderRadius};
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  ${props => props.variant === 'primary' && `
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    &:hover {
      background-color: ${theme.colors.primary}dd;
    }
  `}

  ${props => props.variant === 'danger' && `
    background-color: ${theme.colors.danger};
    color: ${theme.colors.white};
    &:hover {
      background-color: ${theme.colors.danger}dd;
    }
  `}

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Card = styled.div`
  background-color: ${theme.colors.cardBg};
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadow};
  margin-bottom: ${theme.spacing.md};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius};
  margin-bottom: ${theme.spacing.sm};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius};
  margin-bottom: ${theme.spacing.sm};
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;