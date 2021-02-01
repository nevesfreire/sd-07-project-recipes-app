import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Footer from '../components/Footer';

describe('Component Footer', () => {
  test('whether the drinks button appears', () => {
    renderWithRouter(<Footer />);

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    expect(drinksButton).toBeInTheDocument();
  });

  test('whether the explore button appears', () => {
    renderWithRouter(<Footer />);

    const exploreButton = screen.getByTestId('explore-bottom-btn');
    expect(exploreButton).toBeInTheDocument();
  });

  test('whether the food button appears', () => {
    renderWithRouter(<Footer />);

    const foodButton = screen.getByTestId('food-bottom-btn');
    expect(foodButton).toBeInTheDocument();
  });

  test('if there are three buttons in the footer', () => {
    renderWithRouter(<Footer />);
    const numberOfButtons = 3;

    const allButton = screen.getAllByRole('img');
    expect(allButton.length).toBe(numberOfButtons);
  });

  test('Routes for Drinks', () => {
    const { history } = renderWithRouter(<Footer />);

    const drinksButton = screen.getByTestId('drinks-bottom-btn');
    fireEvent.click(drinksButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  test('Routes for Explore', () => {
    const { history } = renderWithRouter(<Footer />);

    const exploreButton = screen.getByTestId('explore-bottom-btn');
    fireEvent.click(exploreButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });

  test('Routes for Food', () => {
    const { history } = renderWithRouter(<Footer />);

    const foodButton = screen.getByTestId('food-bottom-btn');
    fireEvent.click(foodButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
