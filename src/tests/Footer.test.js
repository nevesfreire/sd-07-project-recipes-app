import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Bebidas from '../pages/Bebidas';
import Comidas from '../pages/Comidas';

describe('Testa o componente Footer', () => {
  it('Testa se a pagina de Comidas renderiza o componente de forma correta', () => {
    const { getByTestId } = renderWithRouter(<Comidas />);

    const footerComponent = getByTestId('footer');
    expect(footerComponent).toBeInTheDocument();

    const exploreButton = getByTestId('explore-bottom-btn');
    expect(exploreButton).toBeInTheDocument();

    const foodButton = getByTestId('food-bottom-btn');
    expect(foodButton).toBeInTheDocument();
  });

  it('Testa se a pagina de Bebidas renderiza o componente de forma correta', () => {
    const { getByTestId } = renderWithRouter(<Bebidas />);

    const footerComponent = getByTestId('footer');
    expect(footerComponent).toBeInTheDocument();

    const exploreButton = getByTestId('explore-bottom-btn');
    expect(exploreButton).toBeInTheDocument();

    const foodButton = getByTestId('food-bottom-btn');
    expect(foodButton).toBeInTheDocument();
  });
});
