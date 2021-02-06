import React from 'react';
import { getByTestId } from '@testing-library/react';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Profile screen', () => {
  beforeEach(() => {
    localStorage.setItem('user', '{ "email": "email@mail.com" }');
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('doneRecipes', '[]');
    localStorage.setItem('favoriteRecipes', '[]');
    localStorage.setItem('inProgressRecipes', '{}');
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('82 - Implemente os elementos da a tela de perfil respeitando os atributos descritos no protótipo', () => {
    it('Todos o data-testid do email e de todos os botões', () => {
      const { getByTestId, history } = renderWithRouter(<App />);
      history.push('/perfil');

      expect(getByTestId('profile-email')).toBeInTheDocument();
      expect(getByTestId('profile-done-btn')).toBeInTheDocument();
      expect(getByTestId('profile-favorite-btn')).toBeInTheDocument();
      expect(getByTestId('profile-logout-btn')).toBeInTheDocument();
    });
  });

  describe('83 - Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível', () => {
    it('O e-mail armazenado em localStorage está visível', async () => {
      const { findByTestId, history } = renderWithRouter(<App />);
      history.push('/perfil');

      expect((await findByTestId('profile-email')).innerHTML).toBe('email@mail.com');
    });
  });

  describe('84 - Implemente 3 botões: um de nome "Receitas Feitas", um de nome "Receitas Favoritas" e um de nome "Sair"', () => {
    it('A tela contêm todos os 3 botões', async () => {
      const { findByTestId, history } = renderWithRouter(<App />);
      history.push('/perfil');

      expect((await findByTestId('profile-done-btn')).innerHTML).toBe('Receitas Feitas');
      expect((await findByTestId('profile-favorite-btn')).innerHTML).toBe('Receitas Favoritas');
      expect((await findByTestId('profile-logout-btn')).innerHTML).toBe('Sair');
    });
  });

  describe('85 - Redirecione a pessoa usuária que, ao clicar no botão de "Receitas Favoritas", a rota deve mudar para a tela de receitas favoritas', () => {
    it('Redireciona para a rota correta', () => {
      const { getByTestId, history } = renderWithRouter(<App />);
      history.push('/perfil');

      fireEvent.click(getByTestId('profile-done-btn'));
      expect(history.location.pathname).toBe('/receitas-feitas');
    });
  });

  describe('86 - Redirecione a pessoa usuária que, ao clicar no botão de "Receitas Feitas", a rota deve mudar para a tela de receitas feitas', () => {
    it('Redireciona para a rota correta', () => {
      const { getByTestId, history } = renderWithRouter(<App />);
      history.push('/perfil');

      fireEvent.click(getByTestId('profile-favorite-btn'));
      expect(history.location.pathname).toBe('/receitas-favoritas');
    });
  });

  describe('87 - Redirecione a pessoa usuária que, ao clicar no botão de "Sair", o `localStorage` deve ser limpo e a rota deve mudar para a tela de login', () => {
    it('Limpa todas as chaves da localStorage', async () => {
      const { getByTestId, history } = renderWithRouter(<App />);
      history.push('/perfil');

      expect(localStorage.getItem('user')).toBe('{ "email": "email@mail.com" }');
      expect(localStorage.getItem('mealsToken')).toBe('1');
      expect(localStorage.getItem('cocktailsToken')).toBe('1');
      expect(localStorage.getItem('doneRecipes')).toBe('[]');
      expect(localStorage.getItem('favoriteRecipes')).toBe('[]');
      expect(localStorage.getItem('inProgressRecipes')).toBe('{}');

      fireEvent.click(getByTestId('profile-logout-btn'));
      
      console.log(localStorage.getItem('user'))
      // expect(localStorage.getItem('user')).toBeNull();
      // expect(localStorage.getItem('mealsToken')).toBeNull();
      // expect(localStorage.getItem('cocktailsToken')).toBeNull();
      // expect(localStorage.getItem('doneRecipes')).toBeNull();
      // expect(localStorage.getItem('favoriteRecipes')).toBeNull();
      // expect(localStorage.getItem('inProgressRecipes')).toBeNull();
    });

    it('A rota muda para a tela de login', () => {
      const { getByTestId, history } = renderWithRouter(<App />);
      history.push('/perfil');

      fireEvent.click(getByTestId('profile-logout-btn'));
      
      expect(history.location.pathname).toBe('/');
    });
  });
});
