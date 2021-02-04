import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Login from '../pages/Login';

const LOGIN_DATA = {
  email: 'email-input',
  senha: 'password-input',
  botao: 'login-submit-btn',
};

const EMAIL_IMPUT = 'email-input';
const PASSWORD_IMPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';

afterEach(cleanup);

describe('Testando arquivo Login.js', () => {
  test('A pagina deve possuir um input para email, senha e botão "entrar"', () => {
    const { getByTestId } = render(<Login />);

    Object.keys(LOGIN_DATA).forEach((key) => {
      const attrName = getByTestId(LOGIN_DATA[key]);
      expect(attrName).toBeInTheDocument();
    });

    /*
    const email = getByTestId(EMAIL_IMPUT);
    const senha = getByTestId(PASSWORD_IMPUT);
    const botão = getByTestId(LOGIN_SUBMIT_BTN);
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(botão).toBeInTheDocument();
    */
  });
  test('O botão deve estar desabilitado se o e-mail for inválido', () => {
    const { getByTestId } = render(<Login />);
    const email = getByTestId(EMAIL_IMPUT);
    const botão = getByTestId(LOGIN_SUBMIT_BTN);
    fireEvent.change(email, { target: { value: 'email' } });
    expect(botão).toHaveAttribute('disabled');
  });
  test('O botão deve desabiltar caso a senha tenha menos de seis caracteres', () => {
    const { getByTestId } = render(<Login />);
    const senha = getByTestId(PASSWORD_IMPUT);
    const botão = getByTestId(LOGIN_SUBMIT_BTN);
    fireEvent.change(senha, { target: { value: '12345' } });
    expect(botão).toHaveAttribute('disabled');
  });
  test('Ao preencher email e senha válidos o botão deve estar habilitado', () => {
    const { getByTestId } = render(<Login />);
    const email = getByTestId(EMAIL_IMPUT);
    const senha = getByTestId(PASSWORD_IMPUT);
    const botão = getByTestId(LOGIN_SUBMIT_BTN);
    fireEvent.change(senha, { target: { value: '1234567' } });
    fireEvent.change(email, { target: { value: 'teste@test.com' } });
    expect(botão).not.toHaveAttribute('disabled');
  });
  test('Se ao clicar o botão a pessoa deve ser direcionada para "/Comidas"', () => {
    const { getByTestId, history } = renderWithRouter(<Login />);
    const email = getByTestId(EMAIL_IMPUT);
    const senha = getByTestId(PASSWORD_IMPUT);
    // const botão = getByTestId(LOGIN_SUBMIT_BTN);
    fireEvent.change(senha, { target: { value: '1234567' } });
    fireEvent.change(email, { target: { value: 'teste@test.com' } });
    // fireEvent.click(botão);
    const { pathname } = history.location;
    expect(pathname).toBe('/Comidas');
  });
});
