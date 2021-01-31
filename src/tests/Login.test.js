import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWIthRouterAndRedux from './utils/renderWIthRouterAndRedux';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';

describe('Testes de login', () => {
  it('existe um campo para inserir email', () => {
    const { getByTestId } = renderWIthRouterAndRedux(<App />);

    expect(getByTestId(EMAIL_INPUT)).toBeInTheDocument();
  });

  it('existe um campo para inserir senha', () => {
    const { getByTestId } = renderWIthRouterAndRedux(<App />);

    expect(getByTestId(PASSWORD_INPUT)).toBeInTheDocument();
  });

  it('botão de envio desativado quando o email e a senha não foram validados', () => {
    const { getByTestId } = renderWIthRouterAndRedux(<App />);

    expect(getByTestId(LOGIN_SUBMIT_BTN)).toHaveAttribute('disabled');
  });

  it('o botão de envio está desativado quando apenas o email foi preenchido', () => {
    const { getByTestId } = renderWIthRouterAndRedux(<App />);

    const emailInput = getByTestId(EMAIL_INPUT);
    fireEvent.change(emailInput, { target: { value: 'abcde@gmail.com' } });
    expect(getByTestId(LOGIN_SUBMIT_BTN)).toHaveAttribute('disabled');
  });

  it('o botão de envio está desativado quando apenas a senha foi preenchido', () => {
    const { getByTestId } = renderWIthRouterAndRedux(<App />);

    const passwordInput = getByTestId(PASSWORD_INPUT);
    fireEvent.change(passwordInput, { target: { value: 'senha012' } });
    expect(getByTestId(LOGIN_SUBMIT_BTN)).toHaveAttribute('disabled');
  });

  it('o botão de envio está ativado quando a senha e o email foram validados', () => {
    const { getByTestId } = renderWIthRouterAndRedux(<App />);

    const emailInput = getByTestId(EMAIL_INPUT);
    const passwordInput = getByTestId(PASSWORD_INPUT);
    fireEvent.change(emailInput, { target: { value: 'emaildoteste@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    expect(getByTestId(LOGIN_SUBMIT_BTN)).toHaveProperty('disabled', false);
  });
});
