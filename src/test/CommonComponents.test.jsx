import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button, Card, Input, TextArea } from '../components/common/StyledComponents';
import { ThemeProviderWrapper } from '../styles/ThemeProvider';

const renderWithTheme = (component) => {
  return render(
    <ThemeProviderWrapper>
      {component}
    </ThemeProviderWrapper>
  );
};

describe('Common Components', () => {
  describe('Button', () => {
    it('should render primary button', () => {
      renderWithTheme(<Button variant="primary">Click me</Button>);
      const button = screen.getByText('Click me');
      expect(button).toBeInTheDocument();
      expect(button).toHaveStyle({ backgroundColor: expect.any(String) });
    });

    it('should render danger button', () => {
      renderWithTheme(<Button variant="danger">Delete</Button>);
      const button = screen.getByText('Delete');
      expect(button).toBeInTheDocument();
      expect(button).toHaveStyle({ backgroundColor: expect.any(String) });
    });

    it('should be disabled when disabled prop is true', () => {
      renderWithTheme(<Button disabled>Disabled</Button>);
      expect(screen.getByText('Disabled')).toBeDisabled();
    });
  });

  describe('Card', () => {
    it('should render with correct styles', () => {
      renderWithTheme(<Card>Card content</Card>);
      const card = screen.getByText('Card content');
      expect(card).toBeInTheDocument();
      expect(card).toHaveStyle({
        padding: '16px'
      });
    });
  });

  describe('Input', () => {
    it('should render input with placeholder', () => {
      renderWithTheme(<Input placeholder="Type here" />);
      expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
    });

    it('should have correct styles', () => {
      renderWithTheme(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveStyle({
        width: '100%',
        border: '1px solid #dee2e6'
      });
    });
  });

  describe('TextArea', () => {
    it('should render textarea with placeholder', () => {
      renderWithTheme(<TextArea placeholder="Type here" />);
      expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
    });

    it('should have correct styles', () => {
      renderWithTheme(<TextArea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveStyle({
        width: '100%',
        border: '1px solid #dee2e6'
      });
    });
  });
});