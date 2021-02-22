import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import fetchMock from './mocks/fetch';

global.fetch = jest.fn().mockImplementation(fetchMock);

localStorage.setItem('doneRecipes', JSON.stringify([{ alcoholicOrNot: '',
  area: 'Turkish',
  category: 'Side',
  doneDate: 1613068818732,
  id: '52978',
  image: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
  name: 'Kumpir',
  tags: [],
  type: 'comida',
},
{
  alcoholicOrNot: 'Optional alcohol',
  area: '',
  category: 'Ordinary Drink',
  doneDate: 1613953713520,
  id: '15997',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  name: 'GG',
  tags: [],
  type: 'bebida',
}]));

describe('implement all the data-testids', () => {
  it('should render all the data-testid', () => {
    renderWithRouter(<App />, { route: '/receitas-feitas' });

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getAllByTestId('0-undefined-horizontal-tag')[0]).toBeInTheDocument();
  });
});

describe('the card should contain the corrects elements', () => {
  it('should render the corrects elemente for a food recipe', () => {
    renderWithRouter(<App />, { route: '/receitas-feitas' });

    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getAllByTestId('0-undefined-horizontal-tag')[0]).toBeInTheDocument();
  });
});
