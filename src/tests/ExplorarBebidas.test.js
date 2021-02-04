import React from 'react';
import renderWithRouter from '../utils/renderWithRouter';
import ExplorarBebidas from '../scenes/ExplorarReceitas/components/ExplorarBebidas';

describe('Teste da tela de Explorar Bebidas', () => {
  it('Tem o data-testid explore-by-ingredient', () => {
    const { getByTestId } = renderWithRouter(<ExplorarBebidas />);
    const exploreByIngredient = getByTestId('explore-by-ingredient');
    expect(exploreByIngredient).toBeInTheDocument();
  });

  it('Tem o data-testid explore-surprise', () => {
    const { getByTestId } = renderWithRouter(<ExplorarBebidas />);
    const exploreSurprise = getByTestId('explore-surprise');
    expect(exploreSurprise).toBeInTheDocument();
  });
});
