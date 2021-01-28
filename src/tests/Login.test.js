import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../components/Login';

describe('Component Login', () => {
  test('if there is an email field', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });

  test('if there is an password field', () => {
    renderWithRouter(<Login />);

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  test('if there is an enter button', () => {
    renderWithRouter(<Login />);

    const enterButton = screen.getByTestId('login-submit-btn');
    expect(enterButton).toBeInTheDocument();

    const textEnterButton = screen.getByText(/enter/i);
    expect(textEnterButton).toBeInTheDocument();
  });

  test('whether the button disables and enables', () => {
    renderWithRouter(<Login />);

    const disabledEnterButton = screen.getByRole('button');
    expect(disabledEnterButton).toHaveAttribute('disabled');

    fireEvent.change(emailInput, { target: { value: 'example@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(disabledEnterButton).not.toHaveAttribute('disabled');
  });
});
