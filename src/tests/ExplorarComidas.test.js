import React from 'react';
import renderWithRouter from '../utils/renderWithRouter';
import ExplorarComidas from '../scenes/ExplorarReceitas/components/ExplorarComidas';

describe('Teste da tela de Explorar Comidas', () => {
  it('Tem o data-testid explore-by-ingredient', () => {
    const { getByTestId } = renderWithRouter(<ExplorarComidas />);
    const exploreByIngredient = getByTestId('explore-by-ingredient');
    expect(exploreByIngredient).toBeInTheDocument();
  });

  it('Tem o data-testid explore-by-area', () => {
    const { getByTestId } = renderWithRouter(<ExplorarComidas />);
    const exploreByArea = getByTestId('explore-by-area');
    expect(exploreByArea).toBeInTheDocument();
  });

  it('Tem o data-testid explore-surprise', () => {
    const { getByTestId } = renderWithRouter(<ExplorarComidas />);
    const exploreSurprise = getByTestId('explore-surprise');
    expect(exploreSurprise).toBeInTheDocument();
  });
});
