import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa App.js', () => {
  it('A pagina de login é renderizada ao carregar a aplicação no path de URL /', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Crie um local para que o usuário insira seu email e senha', () => {
    renderWithRouter(<App />, '/');
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
  });
});
