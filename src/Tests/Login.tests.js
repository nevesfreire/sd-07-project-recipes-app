import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';
import App from '../App';

const emailInput = 'email-input';
const passInput = 'password-input';
const loginSubmitBtn = 'login-submit-btn';

describe('Teste página de Login', () => {
  it('Crie os elementos que devem respeitar os atributos descritos no protótipo', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const emailTest = getByTestId(emailInput);
    const passwordTest = getByTestId(passInput);
    const buttonLoginTest = getByTestId(loginSubmitBtn);

    expect(emailTest).toBeInTheDocument();
    expect(passwordTest).toBeInTheDocument();
    expect(buttonLoginTest).toBeInTheDocument();
  });

  it('o formulário abilitado só após a validação de email e senha', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const button = getByTestId(loginSubmitBtn);
    expect(button).toBeDisabled();
    const email = getByTestId(emailInput);
    const senha = getByTestId(passInput);
    userEvent.type(email, 'email');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();
    userEvent.type(email, 'email@com@');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();
    userEvent.type(email, 'emailcom@');
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    expect(button).toBeEnabled();
  });

  it(' Redirecione para a tela principal de receitas após a submissão do login', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const email = getByTestId(emailInput);
    const senha = getByTestId(passInput);
    const button = getByTestId(loginSubmitBtn);
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
