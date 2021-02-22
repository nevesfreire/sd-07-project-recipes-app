import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('sould render the corrects elements', () => {
  it('should render the buttons with data-testid', () => {
    renderWithRouter(<App />, { route: '/explorar' });

    const foodButton = screen.getByTestId('explore-food');
    const drinkButton = screen.getByTestId('explore-drinks');

    expect(foodButton).toBeInTheDocument();
    expect(foodButton.innerHTML).toContain('Explorar Comidas');
    expect(drinkButton).toBeInTheDocument();
    expect(drinkButton.innerHTML).toContain('Explorar Bebidas');
  });

  it('should redirect user to the explore foods routes', () => {
    const { history } = renderWithRouter(<App />, { route: '/explorar' });

    userEvent.click(screen.getByTestId('explore-food'));

    expect(history.location.pathname).toBe('/explorar/comidas');
  });

  it('should redirect user to the explore drinks routes', () => {
    const { history } = renderWithRouter(<App />, { route: '/explorar' });

    userEvent.click(screen.getByTestId('explore-drinks'));

    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
});
