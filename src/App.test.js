import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('Login Page Tests', () => {
  it('Tests if the Login page, have email and password inputs and a Submit Button', ()=> {
    const { getByTestId } = render(<App />);
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    const submit = getByTestId('login-submit-btn');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });
});
