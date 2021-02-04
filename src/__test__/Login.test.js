import React from 'react';
import { cleanup, render } from '@testing-library/react';
import App from '../App';
// import TestingRouter from '../components/TestingRouter';

afterEach(cleanup);

describe('Login Page test', () => {
  it('should render Email and Password inputs and Enter Button', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('email-input')).toBeInTheDocument();
    expect(getByTestId('password-input')).toBeInTheDocument();
    expect(getByTestId('login-submit-btn')).toBeInTheDocument();
  });
  // it('should render Food Page if Email and Password are verified', () => {
  //   const { history } = TestingRouter(<App />);
  //   const emailInput = getByTestId('email-input');
  //   const passwordInput = getByTestId('password-input');
  //   const loginBtn = getByTestId('login-submit-btn');

  // });
});
