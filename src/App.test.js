import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from './App';
import Login from './pages/Login';

describe('2 - Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login', () => {
  it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('login-submit-btn');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

  });
});

describe('3 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever seu email no input de email', () => {
  it('É possível escrever o email', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId('email-input');

    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
    expect(emailInput.value).toBe('email@mail.com');
  });
});

describe('4 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever sua senha no input de senha', () => {
  it('É possível escrever a senha', () => {
    const { getByTestId } = render(<Login />);
    const passwordInput = getByTestId('password-input');
    
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    expect(passwordInput.value).toBe('1234567');
  });
});

describe('5 - Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
  it('O botão deve estar desativado se o email for inválido', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('login-submit-btn');

    expect(submitButton.disabled).toBeTruthy();

    fireEvent.change(emailInput, { target: { value: 'email@mail' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    expect(submitButton.disabled).toBeTruthy();

    fireEvent.change(emailInput, { target: { value: 'email.com' } });

    expect(submitButton.disabled).toBeTruthy();
  });

  it('O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('login-submit-btn');

    expect(submitButton.disabled).toBeTruthy();

    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    expect(submitButton.disabled).toBeTruthy();
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    const { getByTestId } = render(<Login />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('login-submit-btn');

    expect(submitButton.disabled).toBeTruthy();

    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    expect(submitButton.disabled).toBeFalsy();
  });
});