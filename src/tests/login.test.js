import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import Login from '../pages/Login';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const loginInput = 'login-submit-btn';
const emailTest = 'valido@gmail.com';
afterEach(() => cleanup());
describe('2 - Crie todos os elementos que devem respeitar os atributos descritos'
    + 'no protótipo para a tela de login', () => {
  test('O input de email deve possuir o atributo data-testid="email-input"', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const email = getByTestId(emailInput);
    expect(email).toBeInTheDocument();
  });
  test('O input de senha deve possuir o atributo data-testid="password-input"', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const password = getByTestId(passwordInput);
    expect(password).toBeInTheDocument();
  });
  test('O botão "Entrar" deve possuir o atributo data-testid="login-submit-btn"', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const submit = getByTestId(loginInput);
    expect(submit).toBeInTheDocument();
  });
});

describe('3 - Desenvolva a tela de maneira que a pessoa deve conseguir'
    + 'escrever seu email no input de email', () => {
  test('É possível escrever o email', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    fireEvent.change(getByTestId(emailInput),
      { target: { value: 'teste@teste.com' } });
  });
});

describe('4 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever'
    + 'sua senha no input de senha', () => {
  test('É possível escrever a senha', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    fireEvent.change(getByTestId(passwordInput), { target: { value: 'password123' } });
  });
});

describe('5 - Desenvolva a tela de maneira que o formulário só seja válido após '
    + 'um email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
  test('O botão deve estar desativado se o email for inválido', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const button = getByTestId(loginInput);
    fireEvent.change(getByTestId(emailInput), { target: { value: 'invalido' } });
    expect(button).toBeDisabled();
    fireEvent.change(getByTestId(emailInput), { target: { value: 'invalido@bol' } });
    expect(button).toBeDisabled();
    fireEvent.change(getByTestId(emailInput), { target: { value: 'invalido@bolcom' } });
    expect(button).toBeDisabled();
  });
  test('O botão deve estar desativado se a senha deve '
  + 'tiver 6 caracteres ou menos', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const button = getByTestId(loginInput);
    fireEvent.change(getByTestId(passwordInput), { target: { value: '123456' } });
    expect(button).toBeDisabled();
    fireEvent.change(getByTestId(passwordInput), { target: { value: '12345' } });
    expect(button).toBeDisabled();
  });
  test('O botão deve estar ativado se o email e a senha forem válidos', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    fireEvent.change(getByTestId(emailInput), { target: { value: emailTest } });
    fireEvent.change(getByTestId(passwordInput), { target: { value: '1234567' } });
    expect(getByTestId(loginInput)).not.toBeDisabled();
  });
});

describe('6 - Salve 2 tokens no localStorage após a submissão, identificados pelas '
+ ' chaves mealsToken e cocktailsToken', () => {
  test('Após a submissão mealsToken e cocktailsToken devem estar'
  + ' salvos em localStorage', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const apiResponse = { mealsToken: '1', cocktailsToken: '1' };
    fireEvent.change(getByTestId(emailInput), { target:
      { value: emailTest } });
    fireEvent.change(getByTestId(passwordInput), { target: { value: '1234567' } });
    fireEvent.click(getByTestId(loginInput));
    expect(window.localStorage.getItem('mealsToken')).toBe(apiResponse.mealsToken);
    expect(window.localStorage.getItem('cocktailsToken'))
      .toBe(apiResponse.cocktailsToken);
  });
});

describe('7 - Salve o e-mail da pessoa usuária no localStorage '
+ 'na chave user após a submissão', () => {
  test('Após a submissão a chave user deve estar salva em localStorage', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const savedEmail = { email: emailTest };
    fireEvent.change(getByTestId(emailInput), { target:
        { value: 'valido@gmail.com' } });
    fireEvent.change(getByTestId(passwordInput), { target: { value: '1234567' } });
    fireEvent.click(getByTestId(loginInput));
    expect(window.localStorage.getItem('user')).toBe(savedEmail);
  });
});

describe('8 - Redirecione a pessoa usuária para a tela principal de receitas '
+ 'de comidas após a submissão e validação com sucesso do login', () => {
  test('A rota muda para a tela principal de receitas de comidas', async () => {
    const { getByTestId, history } = renderWithRouter(<Login />);
    fireEvent.change(getByTestId(emailInput), { target:
        { value: emailTest } });
    fireEvent.change(getByTestId(passwordInput), { target: { value: '1234567' } });
    fireEvent.click(getByTestId(loginInput), { button: 0 });
    const { pathname } = history.location;
    expect(pathname).toBe('/receitas');
  });
});
