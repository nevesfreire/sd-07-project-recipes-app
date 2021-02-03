import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('Tela de Login', () => {
  test('Existe campo para email', () => {
    const { getByTestId } = render(<App />);
    const email = getByTestId("email-input");
    expect(email).toBeInTheDocument();
  });

  test('Existe campo para senha', () => {
    const { getByTestId } = render(<App />);
    const senha = getByTestId("password-input");
    expect(senha).toBeInTheDocument();
  });

  test('Existe botão entrar e está desabilitado', () => {
    const { getByTestId } = render(<App />);
    const botao = getByTestId("login-submit-btn");
    expect(botao).toBeInTheDocument();
    expect(botao).toHaveAttribute('disabled');
  });

  test('Se o botão habilita quando preencher os campos', () => {
    const { getByTestId } = render(<App />);
    const email = getByTestId("email-input");
    const senha = getByTestId("password-input");
    const botao = getByTestId("login-submit-btn");
    fireEvent.change(email, { target: { value: 'teste@teste.com' } })
    fireEvent.change(senha, { target: { value: '1234567' } })
    expect(botao).not.toHaveAttribute('disabled');

    fireEvent.change(email, { target: { value: 'teste@teste.com' } })
    fireEvent.change(senha, { target: { value: '123456' } })
    expect(botao).toHaveAttribute('disabled');

    fireEvent.change(email, { target: { value: 'testeteste.com' } })
    fireEvent.change(senha, { target: { value: '1234567' } })
    expect(botao).toHaveAttribute('disabled');
  })

  test('Se a rota muda ao clicar no botão', () => {
    const { getByTestId } = render(<App />);
    const email = getByTestId("email-input");
    const senha = getByTestId("password-input");
    const botao = getByTestId("login-submit-btn");
    fireEvent.change(email, { target: { value: 'teste@teste.com' } });
    fireEvent.change(senha, { target: { value: '1234567' } });
    expect(botao).not.toHaveAttribute('disabled');

    fireEvent.click(botao);
    expect(global.window.location.pathname).toEqual('/comidas');
  })
})
