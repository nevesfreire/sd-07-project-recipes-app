import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
});

describe('check if all elements are rendered in the screen', () => {
  it('should render email input', () => {
    const emailInput = screen.getByTestId('email-input');

    expect(emailInput).toBeInTheDocument();
  });
  it('should render password input', () => {
    const passwordInput = screen.getByTestId('password-input');

    expect(passwordInput).toBeInTheDocument();
  });
  it('should render login button', () => {
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(loginButton).toBeInTheDocument();
  });
});
