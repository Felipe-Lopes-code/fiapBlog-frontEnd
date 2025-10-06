import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText(/Blog Dinâmico/i)).toBeInTheDocument()
  })
  
  test('login flow', async () => {
    render(<App />);
    const user = userEvent.setup();
    
    // Click login link
    await user.click(screen.getByText('Login'));
    
    // Fill login form
    await user.type(screen.getByLabelText('Usuário'), 'professor');
    await user.type(screen.getByLabelText('Senha'), '1234');
    await user.click(screen.getByText('Entrar'));
    
    // Check if redirected to admin
    expect(await screen.findByText('Painel Administrativo')).toBeInTheDocument();
  });
});
