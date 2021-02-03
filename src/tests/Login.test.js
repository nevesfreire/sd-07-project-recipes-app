import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter'

describe('Tela de Login', () => {
  renderWithRouter(<App />);
  const inputEmail = screen.getByTestId('email-input');
  const inputPassword = screen.getByTestId('password-input');
  const buttonEnter = screen.getByTestId('login-submit-btn')
  test('Se existe os elementos esperados na tela', () => {
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
  })
})
