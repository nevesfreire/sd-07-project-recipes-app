import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../components/Login';

describe('Component Login', () => {
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

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'example@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    expect(disabledEnterButton).not.toHaveAttribute('disabled');
  });

  test('whether the button redirects to the food page', () => {
    const { history } = renderWithRouter(<Login />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(emailInput, { target: { value: 'example@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    const enterButton = screen.getByTestId('login-submit-btn');

    fireEvent.click(enterButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/comidas');
  });
});
