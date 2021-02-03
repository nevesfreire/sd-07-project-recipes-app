import React from 'react';
// import fireEvent from '@testing-library/user-event';
import Login from '../pages/login';

describe('Testa a página de Login do App de receirtas:', () => {
  test('Verifica se o botão de Login é renderizado:', () => {
    const { getByRole } = renderWithRouter(<Login />);

    const LoginButton = getByRole('button', { name: /(login)/i });
    expect(LoginButton).toBeInTheDocument();
  });
  test('', () => {});
  test('', () => {});
});
