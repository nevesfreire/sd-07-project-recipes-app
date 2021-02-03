import React from 'react';
// import fireEvent from '@testing-library/user-event';
import Login from '../pages/login';

describe('Testa a página de Login do App de receirtas:', () => {
  test('Verifica campo de email:', () => {
    const { getByPlaceholderText } = renderWithRouter(<Login />);

    const EMAIL = getByPlaceholderText(/email@email\.com/i)});
    expect(EMAIL).toBeInTheDocument();
  test('Verifica campo de senha', () => {
      const { getByPlaceholderText } = renderWithRouter(<Login />);
  
      const PASSWD = getByPlaceholderText(/sua senha aqui/i);
      expect(PASSWD).toBeInTheDocument();
  });
  test('Verifica se o botão de Login é renderizado:', () => {
    const { getByRole } = renderWithRouter(<Login />);

    const LOGIN_BTN = getByRole('button', { name: /(logar)/i });
    expect(LOGIN_BTN).toBeInTheDocument();
  });
});
