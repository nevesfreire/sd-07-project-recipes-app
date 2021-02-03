import React from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import Perfil from '../pages/Perfil';

describe('Testar a tela de perfil e suas funcionalidades', () => {
  it('O e-mail está salvo com a key user no localStorage', () => {
    const { getByTestId } = renderWithRouter(<Perfil />);
    const inputEmail = getByTestId('email-input');
    const inputPassword = getByTestId('password-input');
    const submitBtn = getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'email@email.com');
    userEvent.type(inputPassword, '1234567');
    fireEvent.click(submitBtn);
    expect(JSON.parse(localStorage.getItem('user')).email).toBe('email@email.com');
  });

  it('Possui 3 botões com receitas feitas, receitas favoritas e sair', () => {
    const { getByTestId, history } = renderWithRouter(<Perfil />);
    history.push('/perfil');
    const profileDoneButton = getByTestId('profile-done-btn');
    expect(profileDoneButton).toBeInTheDocument();
    const profileFavoriteButton = getByTestId('profile-favorite-btn');
    expect(profileFavoriteButton).toBeInTheDocument();
    const profileLogoutButton = getByTestId('profile-logout-btn');
    expect(profileLogoutButton).toBeInTheDocument();
  });

  it('Clique em receitas favoritas e redireciona para "/receitas-favoritas"', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');
    const profileFavoriteButton = getByTestId('profile-favorite-btn');
    fireEvent.click(profileFavoriteButton);
    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  it('Clique em receitas feitas e redireciona para "/receitas-feitas"', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');
    const profileDoneButton = getByTestId('profile-done-btn');
    fireEvent.click(profileDoneButton);
    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  it('Clique em sair e retorne a tela de login "/", e o localStorage é limpo', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');
    const profileLogoutButton = getByTestId('profile-logout-btn');
    fireEvent.click(profileLogoutButton);
    expect(history.location.pathname).toBe('/');
  });
});
