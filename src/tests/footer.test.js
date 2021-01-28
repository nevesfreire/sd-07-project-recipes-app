import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Food from '../pages/Food';
import Explorar from '../pages/Explore';
import Login from '../pages/Login';
import FoodDetails from '../pages/FoodDetails';
import InProgressRecipes from '../pages/InProgressRecipes';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreByIngredients from '../pages/ExploreByIngredients';
import ExploreByArea from '../pages/ExploreByArea';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Testes menu inferior', () => {
  it('o botão food aparece na tela e direciona para a pagina Foods', () => {
    const { history } = renderWithRouter(<Explorar />);
    fireEvent.click(screen.getByTestId('food-bottom-btn'));
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
  it('o botão explore aparece na tela e direciona para a pagina Explore', () => {
    const { history } = renderWithRouter(<Food />);
    fireEvent.click(screen.getByTestId('explore-bottom-btn'));
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
  it('o botão drinks aparece na tela e direciona para a pagina Drinks', () => {
    const { history } = renderWithRouter(<Explorar />);
    fireEvent.click(screen.getByTestId('drinks-bottom-btn'));
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });
});

describe('Telas em que o menu inferior', () => {
  it('não aparece na tela login ', () => {
    renderWithRouter(<Login />);
    const footerLogin = screen.queryByTestId('footer');
    expect(footerLogin).toBeNull();
  });
  it('não aparece na tela detalhes de comidas ', () => {
    renderWithRouter(<FoodDetails />);
    const footerLogin = screen.queryByTestId('footer');
    expect(footerLogin).toBeNull();
  });
  it('não aparece na tela InProgressRecipes ', () => {
    renderWithRouter(<InProgressRecipes />);
    const footerLogin = screen.queryByTestId('footer');
    expect(footerLogin).toBeNull();
  });
  it('não aparece na tela DoneRecipes ', () => {
    renderWithRouter(<DoneRecipes />);
    const footerLogin = screen.queryByTestId('footer');
    expect(footerLogin).toBeNull();
  });
  it('aparece na tela ExploreFoods', () => {
    renderWithRouter(<ExploreFoods />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('aparece na tela ExploreFoods', () => {
    renderWithRouter(<ExploreDrinks />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('aparece na tela ExploreByIngredients', () => {
    renderWithRouter(<ExploreByIngredients />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('aparece na tela ExploreByArea', () => {
    renderWithRouter(<ExploreByArea />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('aparece na tela Profile', () => {
    renderWithRouter(<Profile />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('não aparece na tela FavoriteRecipes ', () => {
    renderWithRouter(<FavoriteRecipes />);
    const footerLogin = screen.queryByTestId('footer');
    expect(footerLogin).toBeNull();
  });
});
