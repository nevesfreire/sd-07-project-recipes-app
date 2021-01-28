import React from 'react';
import renderWithRouter from '../utils/renderWithRouter';
import Login from '../scenes/Login';

describe('Teste do Login.js', () => {
  it('Tem o data-testid email-input', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailInput = getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });

  it('Tem o data-testid password-input', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const passowordInput = getByTestId('password-input');
    expect(passowordInput).toBeInTheDocument();
  });

  it('Tem o data-testid login-submit-btn', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const btnSubmit = getByTestId('login-submit-btn');
    expect(btnSubmit).toBeInTheDocument();
  });
});
