import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

const FOOTER = 'footer';
const DRINKS_BOTTOM_BTN = 'drinks-bottom-btn';
const FOOD_BOTTOM_BTN = 'food-bottom-btn';
const EXPLORE_BOTTOM_BTN = 'explore-bottom-btn';

describe('footer must contain the rights elements', () => {
  it('sould render the elements with the data-testid', () => {
    renderWithRouter(<App />, { route: '/comidas' });

    const footerBar = screen.getByTestId(FOOTER);
    const drinkButton = screen.getByTestId(DRINKS_BOTTOM_BTN);
    const foodButton = screen.getByTestId(FOOD_BOTTOM_BTN);
    const exploreButton = screen.getByTestId(EXPLORE_BOTTOM_BTN);

    expect(footerBar).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
  });
});

describe('footer elements must contain the rights attributes', () => {
  it('should render the rights attributes for the elements', async () => {
    renderWithRouter(<App />, { route: '/comidas' });

    const footerBar = screen.getByTestId(FOOTER);
    const drinkButton = screen.getByTestId(DRINKS_BOTTOM_BTN);
    const foodButton = screen.getByTestId(FOOD_BOTTOM_BTN);
    const exploreButton = screen.getByTestId(EXPLORE_BOTTOM_BTN);

    expect(footerBar).toHaveStyle('position: fixed');
    expect(drinkButton).toHaveAttribute('src', 'drinkIcon.svg');
    expect(foodButton).toHaveAttribute('src', 'mealIcon.svg');
    expect(exploreButton).toHaveAttribute('src', 'exploreIcon.svg');
  });
});

describe('show footer only in the rights pages', () => {
  it('should not render footer in login page', () => {
    renderWithRouter(<App />);

    expect(screen.queryByTestId(FOOTER)).toBeNull();
  });

  it('should render footer in main food page', () => {
    renderWithRouter(<App />, { route: '/comidas' });

    expect(screen.queryByTestId(FOOTER)).toBeTruthy();
  });

  it('should render footer in main drink page', () => {
    renderWithRouter(<App />, { route: '/bebidas' });

    expect(screen.queryByTestId(FOOTER)).toBeTruthy();
  });

  it('should not render footer in meal details page', () => {
    renderWithRouter(<App />, { route: '/comidas/52977' });

    expect(screen.queryByTestId(FOOTER)).toBeNull();
  });

  it('should not render footer in drink details page', () => {
    renderWithRouter(<App />, { route: '/bebidas/178319' });

    expect(screen.queryByTestId(FOOTER)).toBeNull();
  });

  it('should not render footer in food progress page', () => {
    renderWithRouter(<App />, { route: '/comidas/52977/in-progress' });

    expect(screen.queryByTestId(FOOTER)).toBeNull();
  });

  it('should not render footer in drink progress page', () => {
    renderWithRouter(<App />, { route: '/bebidas/178319/in-progress' });

    expect(screen.queryByTestId(FOOTER)).toBeNull();
  });

  it('should render footer in explore page', () => {
    renderWithRouter(<App />, { route: '/explorar' });

    expect(screen.queryByTestId(FOOTER)).toBeTruthy();
  });

  it('should render footer in explore meals page', () => {
    renderWithRouter(<App />, { route: '/explorar/comidas' });

    expect(screen.queryByTestId(FOOTER)).toBeTruthy();
  });

  it('should render footer in explore drinks page', () => {
    renderWithRouter(<App />, { route: '/explorar/bebidas' });

    expect(screen.queryByTestId(FOOTER)).toBeTruthy();
  });

  it('should render footer in explore meals by ingredient page', () => {
    renderWithRouter(<App />, { route: '/explorar/comidas/ingredientes' });

    expect(screen.queryByTestId(FOOTER)).toBeTruthy();
  });

  it('should render footer in explore drinks by ingredient page', () => {
    renderWithRouter(<App />, { route: '/explorar/bebidas/ingredientes' });

    expect(screen.queryByTestId(FOOTER)).toBeTruthy();
  });

  it('should render footer in explore meals by area page', () => {
    renderWithRouter(<App />, { route: '/explorar/comidas/area' });

    expect(screen.queryByTestId(FOOTER)).toBeTruthy();
  });

  it('should render footer in profile page', () => {
    renderWithRouter(<App />, { route: '/perfil' });

    expect(screen.queryByTestId(FOOTER)).toBeTruthy();
  });

  it('should not render footer in done recipes page', () => {
    renderWithRouter(<App />, { route: '/receitas-feitas' });

    expect(screen.queryByTestId(FOOTER)).toBeNull();
  });

  it('should not render footer in favorites recipes page', () => {
    renderWithRouter(<App />, { route: '/receitas-favoritas' });

    expect(screen.queryByTestId(FOOTER)).toBeNull();
  });
});

describe('redirect user to the correct routes', () => {
  it('should redirect user to cocktails page', () => {
    const { history } = renderWithRouter(<App />, { route: '/comidas' });

    const cocktailsButton = screen.getByTestId(DRINKS_BOTTOM_BTN);
    userEvent.click(cocktailsButton);
    const path = history.location.pathname;
    expect(path).toBe('/bebidas');
  });

  it('should redirect user to explore page', () => {
    const { history } = renderWithRouter(<App />, { route: '/comidas' });

    const exploreButton = screen.getByTestId(EXPLORE_BOTTOM_BTN);
    userEvent.click(exploreButton);
    const path = history.location.pathname;
    expect(path).toBe('/explorar');
  });

  it('should redirect user to meals page', () => {
    const { history } = renderWithRouter(<App />, { route: '/bebidas' });

    const foodsButton = screen.getByTestId(FOOD_BOTTOM_BTN);
    userEvent.click(foodsButton);
    const path = history.location.pathname;
    expect(path).toBe('/comidas');
  });
});
