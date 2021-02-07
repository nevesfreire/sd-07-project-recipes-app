import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_BUTTON = 'login-submit-btn';
const EMAIL = 'ygor@gmail.com';
const PASSWORD = '123456';

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
});

describe('check if all elements are rendered in the screen', () => {
  it('should render email input', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);

    expect(emailInput).toBeInTheDocument();
  });
  it('should render password input', () => {
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    expect(passwordInput).toBeInTheDocument();
  });
  it('should render login button', () => {
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    expect(loginButton).toBeInTheDocument();
  });
});

describe('check if is possible to type in the inputs', () => {
  it('should be possible to type in email input', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);

    userEvent.type(emailInput, EMAIL);

    expect(emailInput).toHaveValue(EMAIL);
  });
  it('should be possible to type in password input', () => {
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    userEvent.type(passwordInput, PASSWORD);

    expect(passwordInput).toHaveValue(PASSWORD);
  });
});
