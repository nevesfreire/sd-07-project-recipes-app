import React from 'react';
// import fireEvent from '@testing-library/user-event';
import Footer from '../components/Footer';

describe('Testa Header é renerizada página de  do App de receirtas:', () => {
  test('Verifica icone Perfil', () => {
    const { getByRole } = renderWithRouter(<Footer />);

    const DRINKSBTN = getByRole('button', { name: /drink/i });
    const DRINKSICON = getByRole('img', { name: /drink/i });
    expect(DRINKSBTN).toBeInTheDocument();
    expect(DRINKSICON).toBeInTheDocument();
  });
  test('Verifica título', () => {
    const { getByRole } = renderWithRouter(<Footer />);

    const EXPLOREBTN = getByRole('button', { name: /explore/i });
    const EXPLOREICON = getByRole('img', { name: /explore/i });
    expect(EXPLOREBTN).toBeInTheDocument();
    expect(EXPLOREICON).toBeInTheDocument();
  });
  test('Verifica icone Search:', () => {
    const { getByRole } = renderWithRouter(<Footer />);

    const FOODBTN = getByRole('button', { name: /food/i });
    const FOODICON = getByRole('img', { name: /food/i });
    expect(FOODBTN).toBeInTheDocument();
    expect(FOODICON).toBeInTheDocument();
  });
});
