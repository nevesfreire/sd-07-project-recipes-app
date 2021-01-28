import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../components/Login'

describe('Component Login', () => {
  test('if there is an email field', () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();

    const enterButton = screen.getByTestId('login-submit-btn');
    expect(enterButton).toBeInTheDocument();

    const textEnterButton = screen.getByText(/enter/i);
    expect(textEnterButton).toBeInTheDocument();

    const disabledEnterButton = screen.getByRole('button');
    expect(disabledEnterButton).toHaveAttribute('disabled');

    fireEvent.change(emailInput, {target: {value: 'example@email.com'}});
    fireEvent.change(passwordInput, {target: {value: '123456'}});

    expect(disabledEnterButton).not.toHaveAttribute('disabled');
  });
});