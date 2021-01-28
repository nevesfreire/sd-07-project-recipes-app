import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';
import App from '../App'

describe('Os elementos devem respeitar os atributos descritos', () => {
  it('O campo de e-mail deve possuir o data-testid="email-input"', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const email = getByTestId('email-input');
    expect(email).toBeInTheDocument();
  });

  it('O campo de senha deve possuir o data-testid="password-input"', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const password = getByTestId('password-input');
    expect(password).toBeInTheDocument();
  });

  it('O botão deve possuir o data-testid="login-submit-btn"', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const button = getByTestId('login-submit-btn');
    expect(button).toBeInTheDocument()
  });
});

describe('Verificar se é possível escrever no campo de e-mail', () => {
  it('O campo e-mail permite a digitação', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const inputEmail = getByTestId('email-input');
    fireEvent.change(inputEmail, { target: { value: 'Wava_West@hotmail.com' } });
    expect(inputEmail.value).toBe('Wava_West@hotmail.com');
  });
});

describe('Verificar se é possível escrever no campo de senha', () => {
  it('O campo password permite a digitação', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const inputPassword = getByTestId('password-input');
    fireEvent.change(inputPassword, { target: { value: 'tYAn3D00shMHgwf' } });
    expect(inputPassword.value).toBe('tYAn3D00shMHgwf');
  });
});

describe('Verificar validações do formulário', () => {
  it('Verificar validação do campo e-mail', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const inputEmail = getByTestId('email-input');
    const button = getByTestId('login-submit-btn');
    const inputPassword = getByTestId('password-input');
    fireEvent.change(inputEmail, { target: { value: 'Erna_Fahey79' } });
    fireEvent.change(inputPassword, { target: { value: 'BAO4M_Sh91VTSOq' } });
    expect(button).toBeDisabled();
    fireEvent.change(inputEmail, { target: { value: 'Lue_Gerlach77@' } });
    fireEvent.change(inputPassword, { target: { value: '_TNNMpUyLJDoXDs' } });
    expect(button).toBeDisabled();
    fireEvent.change(inputEmail, { target: { value: 'Torey.Hilpert@yahoo' } });
    fireEvent.change(inputPassword, { target: { value: 'YmiNG7SZ4EHny2F' } });
    expect(button).toBeDisabled();
    fireEvent.change(inputEmail, { target: { value: '@yahoo.com' } });
    fireEvent.change(inputPassword, { target: { value: 'rJBGQbBPCMyMEOn' } });
    expect(button).toBeDisabled();
  });

  it('Verificar validação campo senha com seis caracteres ou mais', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const inputEmail = getByTestId('email-input');
    const button = getByTestId('login-submit-btn');
    const inputPassword = getByTestId('password-input');
    fireEvent.change(inputEmail, { target: { value: 'Ford.Ruecker73@yahoo.com' } });
    fireEvent.change(inputPassword, { target: { value: '' } });
    expect(button).toBeDisabled();
    fireEvent.change(inputEmail, { target: { value: 'Ford.Ruecker73@yahoo.com' } });
    fireEvent.change(inputPassword, { target: { value: '5F_' } });
    expect(button).toBeDisabled();
    fireEvent.change(inputEmail, { target: { value: 'Ford.Ruecker73@yahoo.com' } });
    fireEvent.change(inputPassword, { target: { value: 'tYClT' } });
    expect(button).toBeDisabled();
    fireEvent.change(inputEmail, { target: { value: 'Ford.Ruecker73@yahoo.com' } });
    fireEvent.change(inputPassword, { target: { value: 'QYXreuAsddOYNC9' } });
    expect(button).toBeEnabled();
  });
});

describe('Salvar tokens com chaves mealsToken e cocktailsToken no localStorage após o login efetuado com sucesso', () => {
  it('Veriicar a existência do token de teste', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const inputEmail = getByTestId('email-input');
    const button = getByTestId('login-submit-btn');
    const inputPassword = getByTestId('password-input');
    fireEvent.change(inputEmail, { target: { value: 'Hilbert89@hotmail.com' } });
    fireEvent.change(inputPassword, { target: { value: 'HQZDQDlKcO0W_6O' } });
    fireEvent.click(button);
    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
  });
});

describe('Salvar o e-mail no localStore após o login efetuado com sucesso', () => {
  it('Efetuado o login o e-mail deve ser salvo no localStorage', () => {
    const { getByTestId } = renderWithRouter(<Login />);
    const inputEmail = getByTestId('email-input');
    const button = getByTestId('login-submit-btn');
    const inputPassword = getByTestId('password-input');
    fireEvent.change(inputEmail, { target: { value: 'Sydnee.Hane27@gmail.com' } });
    fireEvent.change(inputPassword, { target: { value: 'U5YAXJy4WOSDFUp' } });
    fireEvent.click(button);
    const mailUser = localStorage.getItem('user');
    expect(mailUser).toBe('{"email":"Sydnee.Hane27@gmail.com"}');
  });
});

describe('Verificar se o usuário é redirecionado para página "/comidas" após o login efetuado com sucesso', () => {
  it('O usuário é redirecionado para página "/comidas"', () => {
    const { getByTestId, history } = renderWithRouter(<Login />);
    const inputEmail = getByTestId('email-input');
    const button = getByTestId('login-submit-btn');
    const inputPassword = getByTestId('password-input');
    fireEvent.change(inputEmail, { target: { value: 'Edythe61@gmail.com' } });
    fireEvent.change(inputPassword, { target: { value: '2IflVJOPW_FFZF6' } });
    fireEvent.click(button);
    //const { pathname } = useHistory().location;
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
//