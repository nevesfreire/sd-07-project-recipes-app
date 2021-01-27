import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';
import App from '../App';


describe('Testes página de login',() => {
  it('Os elementos devem respeitar os atributos descritos', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const testEmail = getByTestId('email-input');
    const testPassword = getByTestId('password-input');
    const testButton = getByTestId('login-submit-btn');
    expect(testEmail).toBeInTheDocument();
    expect(testPassword).toBeInTheDocument();
    expect(testButton).toBeInTheDocument();
  });

  it('O botão é habilitado após a validação de e-mail e senha', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const btn = getByTestId('login-submit-btn');
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');
    userEvent.type(email, 'nobody');
    userEvent.type(password, '123456');
    expect(btn).toBeDisabled();
    userEvent.type(email, 'nobody@net');
    userEvent.type(password, '123456');
    expect(btn).toBeDisabled();
    userEvent.type(email, 'nobody@net@');
    userEvent.type(password, '123456');
    expect(btn).toBeDisabled();
    userEvent.type(email, 'nobody@net@');
    userEvent.type(password, '123456');
    expect(btn).toBeDisabled();
    userEvent.type(email, 'nobody@mail.net');
    userEvent.type(password, '123456');
    expect(btn).toBeDisabled();
    userEvent.type(email, 'nobody@mail.net');
    userEvent.type(password, '1234567');
    expect(btn).toBeEnabled();
    });

    it('Redirecionar para a tela principal de receitas após login', () => {
      const { getByTestId, history } = renderWithRouter(<App />);
      const email = getByTestId('email-input');
      const password = getByTestId('password-input');
      const btn = getByTestId('login-submit-btn');
      userEvent.type(email, 'Lamont_Conn@yahoo.com');
      userEvent.type(password, 'AkWQSuJmQMXCuNc');
      userEvent.click(btn);
      const { pathname } = history.location;
      expect(pathname).toBe('/comidas');
    });
});