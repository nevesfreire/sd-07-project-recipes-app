import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../../Tests/renderWithRouter';
import Login from './index';

describe('testando pagina de login', () => {
  test('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    expect(getByTestId('email-input')).toBeInTheDocument();
    expect(getByTestId('password-input')).toBeInTheDocument();
    expect(getByTestId('login-submit-btn')).toBeInTheDocument();
  });
  test('É possível escrever o email', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const email = getByTestId('email-input');
    fireEvent.change(email, 'email@email.com');
    expect(email.value).toBe('email@email.com');
  });
  test('É possível escrever a senha', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const password = getByTestId('password-input');
    fireEvent.change(password, '123321');
    expect(password.value).toBe('123321');
  });
  test('O botão deve estar desativado se o email for inválido', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const loginButton = getByTestId('login-submit-btn');
    expect(loginButton.disable).toBe(true);
  });
  test('- O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos', () => {
    const { getByTestId } = renderWithRouter(<Login />);

  });
  test('- O botão deve estar ativado se o email e a senha forem válidos', () => {
    const { getByTestId } = renderWithRouter(<Login />);

  });
  test('- Após a submissão mealsToken e cocktailsToken devem estar salvos em localStorage', () => {
    const { getByTestId } = renderWithRouter(<Login />);

  });
  test('- Após a submissão a chave user deve estar salva em localStorage', () => {
    const { getByTestId } = renderWithRouter(<Login />);

  });
  test('- A rota muda para a tela principal de receitas de comidas', () => {
    const { getByTestId } = renderWithRouter(<Login />);
  });
});
