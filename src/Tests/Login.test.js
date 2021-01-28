import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';

const myEmail = 'email-input';
const myPassword = 'password-input';
const myButton = 'login-submit-btn'

afterEach(cleanup);

describe('Teste página de Login', () => {
  const { getByTestId, history } = renderWithRouter(<Login />);
  const email = getByTestId(myEmail);
  const senha = getByTestId(myPassword);
  const button = getByTestId(myButton); 


  it('Crie os elementos que devem respeitar os atributos descritos no protótipo', () => {
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('o formulário abilitado só após a validação de email e senha', () => {
    expect(button).toBeDisabled();
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
    userEvent.type(senha, '123456');
    expect(button).toBeDisabled();
  });
});
