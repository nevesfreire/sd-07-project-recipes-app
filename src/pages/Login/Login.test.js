import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../../components/RenderWithRouter';
import Login from './index';

const emailInput = 'email-input';
const passwordInput = 'password-input';
const loginSubmitBnt = 'login-submit-btn';
const validEmail = 'email@email.com';
describe('testando pagina de login', () => {
  test('- Tem os data-testids email-input, password-input e login-submit-btn', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    expect(getByTestId(emailInput)).toBeInTheDocument();
    expect(getByTestId(passwordInput)).toBeInTheDocument();
    expect(getByTestId(loginSubmitBnt)).toBeInTheDocument();
  });
  test('- É possível escrever o email', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailInput);
    fireEvent.change(email, validEmail);
    console.log(email.value);
    expect(email.value).toEqual(validEmail);
  });
  test('- É possível escrever a senha', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const password = getByTestId(passwordInput);
    fireEvent.change(password, '123321');
    expect(password.value).toBe('123321');
  });
  test('- O botão deve estar desativado se o email for inválido', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailInput);
    fireEvent.change(email, 'email@email');
    const password = getByTestId(passwordInput);
    fireEvent.change(password, '1234567');
    const loginButton = getByTestId(loginSubmitBnt);
    expect(loginButton.disabled).toBe(true);
  });
  test('- O botão deve estar desativado se a senha tiver 6 caracteres ou menos', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailInput);
    fireEvent.change(email, validEmail);
    const loginButton = getByTestId(loginSubmitBnt);
    const password = getByTestId(passwordInput);
    fireEvent.change(password, '123456');
    expect(loginButton.disabled).toBe(true);
  });
  test('- O botão deve estar ativado se o email e a senha forem válidos', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId(emailInput);
    fireEvent.change(email, validEmail);
    const loginButton = getByTestId(loginSubmitBnt);
    const password = getByTestId(passwordInput);
    fireEvent.change(password, '1234567');
    expect(loginButton.disabled).toBe(false);
  });
  test('- Após submissão, mealsToken e cocktailsToken devem estar salvos em localStorage',
    () => {
      const { getByTestId } = renderWithRouter(<Login />);

      localStorage.clear();
      const email = getByTestId(emailInput);
      fireEvent.change(email, validEmail);
      const loginButton = getByTestId(loginSubmitBnt);
      const password = getByTestId(passwordInput);
      fireEvent.change(password, '1234567');
      fireEvent.click(loginButton);
      expect(localStorage.getItem('mealsToken')).to.eq('1');
      expect(localStorage.getItem('cocktailsToken')).to.eq('1');
    });
  test('- Após a submissão a chave user deve estar salva em localStorage', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    localStorage.clear();
    const email = getByTestId(emailInput);
    fireEvent.change(email, validEmail);
    const loginButton = getByTestId(loginSubmitBnt);
    const password = getByTestId(passwordInput);
    fireEvent.change(password, '1234567');
    fireEvent.click(loginButton);
    expect(JSON.parse(localStorage.getItem('user'))).to.deep.eq({
      email: 'email@mail.com',
    });
  });
  test('- A rota muda para a tela principal de receitas de comidas', () => {
    const { getByTestId, history } = renderWithRouter(<Login />);

    localStorage.clear();
    const email = getByTestId(emailInput);
    fireEvent.change(email, validEmail);
    const loginButton = getByTestId(loginSubmitBnt);
    const password = getByTestId(passwordInput);
    fireEvent.change(password, '1234567');
    fireEvent.click(loginButton);
    expect(history.location.pathname).toBe('/comidas');
  });
});
