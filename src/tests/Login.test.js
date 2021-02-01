import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import Login from '../pages/Login';

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

describe('6 - Salve 2 tokens no localStorage após a submissão, identificados pelas chaves mealsToken e cocktailsToken', () => {
  it('Após a submissão mealsToken e cocktailsToken devem estar salvos em localStorage', () => {
    const { getByTestId } = renderWithRouter(<App />, '/');
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('login-submit-btn');

    localStorage.clear();

    expect(submitButton.disabled).toBeTruthy();
    expect(localStorage.getItem('mealsToken')).toBeNull();
    expect(localStorage.getItem('cocktailsToken')).toBeNull();

    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(submitButton);

    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');

    localStorage.clear();
  });
});

describe('7 - Salve o e-mail da pessoa usuária no localStorage na chave user após a submissão', () => {
  it('Após a submissão a chave user deve estar salva em localStorage', () => {
    const { getByTestId } = renderWithRouter(<App />, '/');
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('login-submit-btn');

    localStorage.clear();

    expect(submitButton.disabled).toBeTruthy();
    expect(localStorage.getItem('user')).toBeNull();

    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(submitButton);

    expect(JSON.parse(localStorage.getItem('user'))).toEqual({email: 'email@mail.com'});
    localStorage.clear();
  });
});

describe('8 - Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login', () => {
  it('A rota muda para a tela principal de receitas de comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('login-submit-btn');

    localStorage.clear();

    expect(submitButton.disabled).toBeTruthy();
    expect(localStorage.getItem('user')).toBeNull();

    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(submitButton);

    expect(history.location.pathname).toBe('/comidas');

    localStorage.clear();
  });
});