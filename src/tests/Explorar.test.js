import React from 'react';
import renderWithRouter from '../utils/renderWithRouter';
import ExploreFoodButton from '../scenes/Explorar/components/ExploreFoodButton';
import ExploreDrinksButton from '../scenes/Explorar/components/ExploreDrinksButton';

describe('Teste da tela de Explorar', () => {
  it('Tem o data-testid explore-food', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoodButton />);
    const exploreFood = getByTestId('explore-food');
    expect(exploreFood).toBeInTheDocument();
  });

  it('Tem o data-testid explore-drinks', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinksButton />);
    const exploreDrinks = getByTestId('explore-drinks');
    expect(exploreDrinks).toBeInTheDocument();
  });
});
