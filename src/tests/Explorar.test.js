import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Comidas from '../pages/Comidas';
import Explorar from '../pages/Explorar';

describe('Testa o comportamente do componente Explorar.js', () => {
  it('Verifica a mudança de rota para \'explorar\'', async () => {
    const { history } = renderWithRouter(<Comidas />);
    const explorarIcon = await screen.findByTestId('explore-bottom-btn');

    expect(explorarIcon).toBeInTheDocument();

    fireEvent.click(explorarIcon);

    expect(history.location.pathname).toBe('/explorar');
  });

  it('Verifica os elementos na tela', async () => {
    renderWithRouter(<Explorar />);
    const exploreFoods = await screen.findByTestId('explore-food');
    const exploreDrinks = await screen.findByTestId('explore-drinks');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(exploreFoods).toBeInTheDocument();
    expect(exploreDrinks).toBeInTheDocument();

    expect(profileIcon.tagName).toBe('A');
    expect(pageTitle.textContent).toBe('Explorar');
    expect(exploreFoods.textContent).toBe('Explorar Comidas');
    expect(exploreDrinks.textContent).toBe('Explorar Bebidas');

    const drinkIcon = await screen.findByTestId('drinks-bottom-btn');
    const foodIcon = await screen.findByTestId('food-bottom-btn');

    expect(drinkIcon.tagName).toBe('A');
    expect(foodIcon.tagName).toBe('A');
  });
  it('Verifica a mudança de rota para \'/explorar/comidas\'', async () => {
    const { history } = renderWithRouter(<Explorar />);
    const exploreFoods = await screen.findByTestId('explore-food');

    fireEvent.click(exploreFoods);
    expect(history.location.pathname).toBe('/explorar/comidas');
  });
  it('Verifica a mudança de rota para \'/explorar/bebidas\'', async () => {
    const { history } = renderWithRouter(<Explorar />);
    const exploreDrinks = await screen.findByTestId('explore-drinks');

    fireEvent.click(exploreDrinks);
    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
});
