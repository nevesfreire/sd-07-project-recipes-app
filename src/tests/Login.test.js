import React from 'react';
import { fireEvent, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';


describe('Teste da Tela de Login', () => {
  
  test('Se existe os elementos esperados na tela', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonEnter).toBeInTheDocument();
  });

  test('Se quando dijita email e senha fora do padrão continua desabilitado', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'xablau');
    userEvent.type(inputPassword, '123456');

    expect(buttonEnter).toBeDisabled();

    userEvent.type(inputEmail, 'alguem@alguem.com');
    userEvent.type(inputPassword, '12345');

    expect(buttonEnter).toBeDisabled();
  })

  test('Se dijitar email e senha corretos o botão é habilitado', () => {

    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'alguem@email.com');
    userEvent.type(inputPassword, '1234562');

    expect(buttonEnter).toBeEnabled();
  })

  test('Se ao clicar no botão entrar redireciona para tela Principal de receitas de comidas', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'alguem@email.com');
    userEvent.type(inputPassword, '1234562');
    expect(buttonEnter).toBeEnabled();

    fireEvent.click(buttonEnter);


    const { pathname } = history.location;

    expect(pathname).toBe('/comidas')
  })


});