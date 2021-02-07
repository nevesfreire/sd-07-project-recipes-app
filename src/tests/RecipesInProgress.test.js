import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRedux from './helpers/renderWithRedux';
import { RecipeInProgress } from '../pages';

const mealMock = require('./Mocks/oneMeal');

const mockFetchMeals = Promise.resolve({
  json: () => Promise.resolve(mealMock),
});

const DATA_TEST_ID_PHOTO = 'recipe-photo';
const DATA_TEST_ID_TITLE = 'recipe-title';
const DATA_TEST_ID_CATEGORY = 'recipe-category';
const DATA_TEST_ID_INSTRUCTIONS = 'instructions';

describe('Teste se a página de detalhes da receita', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchMeals);
  });
  afterEach(() => (
    jest.clearAllMocks()
  ));

  it('renderiza os detalhes da receita na tela', async () => {
    renderWithRedux(
      <RecipeInProgress
        match={ { url: 'comidas/52212', path: '/comidas/:id', params: { id: '52212' } } }
      />,
    );
    const INITIAL_INDEX = 0;
    const MAX_INDEX = 8;
    const INDEX_STEP = 1;
    const image = await screen.findByTestId(DATA_TEST_ID_PHOTO);
    const title = await screen.findByTestId(DATA_TEST_ID_TITLE);
    const category = await screen.findByTestId(DATA_TEST_ID_CATEGORY);
    const instructions = await screen.findByTestId(DATA_TEST_ID_INSTRUCTIONS);
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    for (let index = INITIAL_INDEX; index < MAX_INDEX; index += INDEX_STEP) {
      const ingredient = screen.queryByTestId(`${index}-ingredient-step`);
      expect(ingredient).toBeInTheDocument();
    }
  });

  it(`renderiza os botões de compartilhar,
    de favoritar e de iniciar receita`, async () => {
    renderWithRedux(
      <RecipeInProgress
        match={ { url: 'comidas/52212', path: '/comidas/:id', params: { id: '52212' } } }
      />,
    );
    const shareButton = await screen.findByTestId('share-btn');
    const favoriteButton = await screen.findByTestId('favorite-btn');
    const finishButton = await screen.findByTestId('finish-recipe-btn');
    expect(shareButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(finishButton).toBeInTheDocument();
  });
});
