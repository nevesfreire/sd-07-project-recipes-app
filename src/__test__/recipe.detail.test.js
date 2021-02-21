import React from 'react';
import { screen, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';
import fetchMock from './mocks/fetch';

global.fetch = jest.fn().mockImplementation(fetchMock);

describe('implement all the data-testid in the elements', () => {
  it('should render all meals elements with the data-testid', async () => {
    renderWithRouter(<App />, { route: '/comidas/52977' });

    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    await wait(
      () => expect(screen.getByTestId('0-ingredient-name-and-measure'))
        .toBeInTheDocument(),
    );
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('0-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
  });

  it('should render all drinks elements with the data-testid', async () => {
    renderWithRouter(<App />, { route: '/bebidas/15997' });

    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    await wait(
      () => expect(screen.getByTestId('0-ingredient-name-and-measure'))
        .toBeInTheDocument(),
    );
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('0-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
  });
});
