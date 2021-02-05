import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Login from '../Pages/Login';

describe('testa a página de login', () => {
  it('should be a email input', () => {
    const { history, getByTestId } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const input = getByTestId('email - input');
    expect(input).toBeInTheDocument();
  });

it('shold be a password input', () => {
  const { history } = renderWithRouter(<Login />);
  expect(history.location.pathname).toBe('/');
  const password = getByTestId('password-input');
  expect(password).toBeInTheDocument();
});

it('shold be 1 buttons', () => {
  const { getAllByRolle } = renderWithRouter(<Login />);
  const um = 1;
  const button = getAllByRolle('button');
  expect(button.length).toBe(1);
});


it('should  inputs put the button to enable e goes to  /comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const inputLogin = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitBtn = getByTestId('login-submit-btn');

    expect(submitBtn).toBeDisabled();

    fireEvent.change(inputLogin, {target: {value: 'email@email.com'}});
    expect(inputLogin.value).toBe('email@email.com');

    expect(submitBtn).toBeDisabled();

    fireEvent.change(passwordInput, {target: {value: '1234567'}});
    expect(passwordInput.value).toBe('1234567');

    expect(submitBtn).toBeEnabled();
}