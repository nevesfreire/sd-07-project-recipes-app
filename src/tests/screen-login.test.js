import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import userEvent from '@testing-library/user-event';

import App from '../App';
import Food from '../pages/Food';

const email = 'email-input';
const senha = 'password-input';
const buttons = 'login-submit-btn';
const emails1 = 'alguem@email.com';
const emails2 = 'email@mail.com';

const saveTokens = (tokens, value) => localStorage.setItem(tokens, value);

const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  return { ...resources };
};

describe('2 - Crie todos os elementos que devem respeitar os atributos '
  + 'descritos no protótipo para a tela de login', () => {
  it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    render(<App />);
    expect(screen.getByTestId(email)).toBeInTheDocument();
    expect(screen.getByTestId(senha)).toBeInTheDocument();
    expect(screen.getByTestId(buttons)).toBeInTheDocument();
  });
});

describe('3 - Desenvolva a tela de maneira que a pessoa deve conseguir '
  + 'escrever seu email no input de email', () => {
  it('É possível escrever o email', () => {
    render(<App />);
    expect(screen.getByTestId(email)).toBeInTheDocument();
    userEvent.type(screen.getByTestId(email), emails1);
  });
});

describe('4 - Desenvolva a tela de maneira que a pessoa deve conseguir '
  + 'escrever sua senha no input de senha', () => {
  it('É possível escrever a senha', () => {
    render(<App />);
    expect(screen.getByTestId(senha)).toBeInTheDocument();
    userEvent.type(screen.getByTestId(senha), '1234567');
  });
});

describe('5 - Desenvolva a tela de maneira que o formulário só seja válido '
  + 'após um email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
  it('O botão deve estar desativado se o email for inválido', () => {
    render(<App />);
    const button = screen.getByText(/Entrar/i);
    expect(button).toBeDisabled();

    userEvent.type(screen.getByTestId(email), 'email');
    userEvent.type(screen.getByTestId(senha), '123456');
    expect(button).toBeDisabled();

    userEvent.type(screen.getByTestId(email), 'email@com@');
    userEvent.type(screen.getByTestId(senha), '1234567');
    expect(button).toBeDisabled();

    userEvent.type(screen.getByTestId(email), 'emailcom@');
    userEvent.type(screen.getByTestId(senha), '123456');
    expect(button).toBeDisabled();

    userEvent.type(screen.getByTestId(email), emails1);
    userEvent.type(screen.getByTestId(senha), '23456');
    expect(button).toBeDisabled();

    userEvent.type(screen.getByTestId(email), 'alguem@email.');
    userEvent.type(screen.getByTestId(senha), '123456');
    expect(button).toBeDisabled();

    userEvent.type(screen.getByTestId(email), emails1);
    userEvent.type(screen.getByTestId(senha), '1234567');
    expect(button).toBeEnabled();
  });
});

it('O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos', () => {
  render(<App />);
  userEvent.type(screen.getByTestId(email), emails1);
  userEvent.type(screen.getByTestId(senha), '23456');
  expect(screen.getByTestId(buttons)).toBeDisabled();

  userEvent.type(screen.getByTestId(email), 'alguem@email.');
  userEvent.type(screen.getByTestId(senha), '123456');
  expect(screen.getByTestId(buttons)).toBeDisabled();

  userEvent.type(screen.getByTestId(email), emails1);
  userEvent.type(screen.getByTestId(senha), '1234567');
  expect(screen.getByTestId(buttons)).toBeEnabled();
});

it('O botão deve estar ativado se o email e a senha forem válidos', () => {
  render(<App />);

  const button = screen.getByText(/Entrar/i);
  expect(button).toBeDisabled();

  userEvent.type(screen.getByTestId(email), emails1);
  userEvent.type(screen.getByTestId(senha), '1234567');
  expect(button).toBeEnabled();

  expect(button).not.toBeDisabled();
});

describe('6 - Salve 2 tokens no localStorage após a submissão, '
  + 'identificados pelas chaves mealsToken e cocktailsToken', () => {
  it('Após a submissão mealsToken e cocktailsToken devem estar '
    + 'salvos em localStorage', () => {
    render(<App />);
    beforeEach(() => localStorage.clear());
    const button = screen.getByText(/Entrar/i);

    expect(button).toBeDisabled();
    expect(localStorage.getItem('mealsToken')).toBe(null);
    expect(localStorage.getItem('cocktailsToken')).toBe(null);

    userEvent.type(screen.getByTestId(email), emails2);
    userEvent.type(screen.getByTestId(senha), '1234567');
    expect(button).toBeEnabled();
    fireEvent.click(button);

    saveTokens('mealsToken', 1);
    expect(Number(localStorage.getItem('mealsToken'))).toBe(1);

    saveTokens('cocktailsToken', 1);
    expect(Number(localStorage.getItem('cocktailsToken'))).toBe(1);
  });
});

describe('7 - Salve o e-mail da pessoa usuária no localStorage na chave user', () => {
  it('Após a submissão a chave user deve estar salva em localStorage', () => {
    render(<App />);
    beforeEach(() => localStorage.clear());

    expect(localStorage.getItem('user')).toBe(null);

    userEvent.type(screen.findByTestId(email), emails1);
    userEvent.type(screen.findByTestId(senha), '1234567');

    localStorage.setItem('user', JSON.stringify({ email: emails2 }));

    expect(JSON.parse(localStorage.getItem('user'))).toBeContain({ email: emails2 });
  });
});

describe('8 - Redirecione a pessoa usuária para a tela principal', () => {
  it('A rota muda para a tela principal de receitas de comidas', () => {
    render(<App />);
    beforeEach(() => localStorage.clear());

    expect(screen.findByTestId(buttons)).toBeDisabled();
    expect(localStorage.getItem('user')).toBe(null);

    userEvent.type(emails2);
    userEvent.type('1234567');
    fireEvent.click(button);

    expect(render(<Food />)).toBe(renderPath('/comidas'));
  });
});
