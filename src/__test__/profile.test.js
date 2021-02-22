import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

localStorage.setItem('user', JSON.stringify({ email: 'ygor@gmail.com' }));

const ZERO = 0;

describe('implement all the data-testid', () => {
  it('render all the data-testid', () => {
    renderWithRouter(<App />, { route: '/perfil' });

    const userEmail = screen.getByTestId('profile-email');
    const profileButton = screen.getByTestId('profile-done-btn');
    const favoriteButton = screen.getByTestId('profile-favorite-btn');
    const logoutButton = screen.getByTestId('profile-logout-btn');

    expect(userEmail).toBeInTheDocument();
    expect(userEmail.innerHTML).toBe('ygor@gmail.com');
    expect(profileButton).toBeInTheDocument();
    expect(profileButton.innerHTML).toBe('Receitas Feitas');
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton.innerHTML).toBe('Receitas Favoritas');
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton.innerHTML).toBe('Sair');
  });

  it('should redirect to favorites recipes page', () => {
    const { history } = renderWithRouter(<App />, { route: '/perfil' });

    userEvent.click(screen.getByTestId('profile-favorite-btn'));

    expect(history.location.pathname).toBe('/receitas-favoritas');
  });

  it('should redirect to done recipes page', () => {
    const { history } = renderWithRouter(<App />, { route: '/perfil' });

    userEvent.click(screen.getByTestId('profile-done-btn'));

    expect(history.location.pathname).toBe('/receitas-feitas');
  });

  it('should redirect to done recipes page', () => {
    const { history } = renderWithRouter(<App />, { route: '/perfil' });

    userEvent.click(screen.getByTestId('profile-logout-btn'));

    expect(history.location.pathname).toBe('/');
    // console.log(localStorage);
    expect(localStorage).toHaveLength(ZERO);
  });
});
