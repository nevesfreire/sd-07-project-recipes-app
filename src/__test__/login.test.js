import React from 'react';
import { screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_BUTTON = 'login-submit-btn';
const EMAIL = 'ygor@gmail.com';
const PASSWORD = '1234567';
const INVALID_PASSWORD = '12345';
const INVALID_EMAILS = [
  'ygor',
  'ygor.com',
  'ygor@',
  '@gmail.com',
  'ygor@gmail',
  '@.com',
];

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
});

// afterEach(() => {
//   cleanup();
// });

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

describe('check if login button is only abled with correct inputs', () => {
  it('login button should be disabled if email is invalid', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    INVALID_EMAILS.forEach((email) => {
      userEvent.type(emailInput, email);
      userEvent.type(passwordInput, PASSWORD);

      expect(loginButton.disabled).toBeTruthy();
    });
  });

  it('login button should be disabled if password has not 6 characters', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, INVALID_PASSWORD);

    expect(loginButton.disabled).toBeTruthy();
  });

  it('login button should be abled if email and password are corrects', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);

    expect(loginButton.disabled).toBeFalsy();
  });
});

describe('test if localStorage has the right tokens', () => {
  it('the keys "mealsToken" and "cocktailsToken" must have value equal to 1', () => {
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByTestId(LOGIN_BUTTON);

    userEvent.type(emailInput, EMAIL);
    userEvent.type(passwordInput, PASSWORD);
    fireEvent.click(loginButton);

    expect(JSON.parse(localStorage.getItem('mealsToken'))).toBe(1);
    expect(JSON.parse(localStorage.getItem('cocktailsToken'))).toBe(1);
  });

  it('the key "user" should have the right email', () => {
    expect(JSON.parse(localStorage.getItem('user')).email).toBe(EMAIL);
  });
});
