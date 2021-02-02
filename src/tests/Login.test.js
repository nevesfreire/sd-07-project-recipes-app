import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

describe('Login page', () => {
  test('check if the document has two entries - an email and a password', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const inputEmail = getByTestId(/email-input/i);
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = getByTestId(/password-input/i);
    expect(inputPassword).toBeInTheDocument();
  });

  test('it is possible to write in the input', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const inputEmail = getByTestId(/email-input/i);
    const inputPassword = getByTestId(/password-input/i);

    const email = 'teste@email.com';
    const senha = '1234567';

    fireEvent.change(inputEmail, { target: { value: email } });
    fireEvent.change(inputPassword, { target: { value: senha } });

    expect(inputEmail.value).toBe(email);
    expect(inputPassword.value).toBe(senha);
  });

  test('checks if the enter button exists', () => {
    const { getByText, getByTestId, history } = renderWithRouter(<Login />);
    const buttonEnter = getByText(/Entrar/i);
    const inputEmail = getByTestId(/email-input/i);
    const inputPassword = getByTestId(/password-input/i);

    expect(buttonEnter).toBeInTheDocument();
    expect(buttonEnter).toHaveAttribute('disabled');

    fireEvent.change(inputEmail, { target: { value: 'teste@email.com' } });
    fireEvent.change(inputPassword, { target: { value: '1234567' } });

    expect(buttonEnter).not.toBeDisabled();

    fireEvent.click(buttonEnter);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
