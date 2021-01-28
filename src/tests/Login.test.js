import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../components/Login';

describe('Component Login', () => {
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');

  test('if there is an email field', () => {
    renderWithRouter(<Login />);

    expect(emailInput).toBeInTheDocument();
  });

  test('if there is an password field', () => {
    renderWithRouter(<Login />);

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

  test('whether the button redirects to the food page', () => {
    const { history } = renderWithRouter(<Login />);

    fireEvent.change(emailInput, { target: { value: 'example@email.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    const enterButton = screen.getByTestId('login-submit-btn');

    fireEvent.click(enterButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/food');
  });
});
