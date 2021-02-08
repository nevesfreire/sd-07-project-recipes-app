import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
// import fireEvent from '@testing-library/user-event';
import Footer from '../components/Footer';

describe('Testa se FOOTER é renerizada:', () => {
  test('Verifica icone DRINKS', () => {
    const { getByRole } = renderWithRouter(<Footer />);

    const DRINKSBTN = getByRole('button', { name: /drink/i });
    const DRINKSICON = getByRole('img', { name: /drink/i });
    expect(DRINKSBTN).toBeInTheDocument();
    expect(DRINKSICON).toBeInTheDocument();
  });
  test('Verifica icone EXPLORE', () => {
    const { getByRole } = renderWithRouter(<Footer />);

    const EXPLOREBTN = getByRole('button', { name: /explore/i });
    const EXPLOREICON = getByRole('img', { name: /explore/i });
    expect(EXPLOREBTN).toBeInTheDocument();
    expect(EXPLOREICON).toBeInTheDocument();
  });
  test('Verifica icone FOODS:', () => {
    const { getByRole } = renderWithRouter(<Footer />);

    const FOODBTN = getByRole('button', { name: /food/i });
    const FOODICON = getByRole('img', { name: /food/i });
    expect(FOODBTN).toBeInTheDocument();
    expect(FOODICON).toBeInTheDocument();
  });
});
