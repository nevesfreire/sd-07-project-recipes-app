import React from 'react';
/* import { MemoryRouter } from 'react-router-dom'; */
import { screen } from '@testing-library/react';
import renderWithRedux from './helpers/renderWithRedux';
import { RecipeDetails } from '../pages';

const mealMock = require('./Mocks/oneMeal');

const mockFetchMeals = Promise.resolve({
  json: () => Promise.resolve(mealMock),
});

const DATA_TEST_ID_CARD = '0-recipe-card';
const DATA_TEST_ID_PHOTO = 'recipe-photo';
const DATA_TEST_ID_TITLE = 'recipe-title';
const DATA_TEST_ID_CATEGORY = 'recipe-category';
const DATA_TEST_ID_INSTRUCTIONS = 'instructions';
const DATA_TEST_ID_VIDEO = 'video';
/* const DATA_TEST_ID_INGREDIENT = 'ingredient-name-and-measure'; */

describe('Teste se a página de detalhes da receita', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchMeals);
  });
  afterEach(() => (
    jest.clearAllMocks()
  ));

  it('renderiza os detalhes da receita na tela', async () => {
    renderWithRedux(
      <RecipeDetails
        match={ { url: 'comidas/52212', path: '/comidas/:id', params: { id: '52212' } } }
      />,
    );
    const INITIAL_INDEX = 0;
    const MAX_INDEX = 8;
    const INDEX_STEP = 1;
    const card = await screen.findByTestId(DATA_TEST_ID_CARD);
    const image = await screen.findByTestId(DATA_TEST_ID_PHOTO);
    const title = await screen.findByTestId(DATA_TEST_ID_TITLE);
    const category = await screen.findByTestId(DATA_TEST_ID_CATEGORY);
    const instructions = await screen.findByTestId(DATA_TEST_ID_INSTRUCTIONS);
    const video = await screen.findByTestId(DATA_TEST_ID_VIDEO);
    expect(card).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    for (let index = INITIAL_INDEX; index < MAX_INDEX; index += INDEX_STEP) {
      const ingredient = screen.queryByTestId(`${index}-ingredient-name-and-measure`);
      expect(ingredient).toBeInTheDocument();
    }
  });

  it(`renderiza os botões de compartilhar,
    de favoritar e de iniciar receita`, async () => {
    renderWithRedux(
      <RecipeDetails
        match={ { url: 'comidas/52212', path: '/comidas/:id', params: { id: '52212' } } }
      />,
    );
    const shareButton = await screen.findByTestId('share-btn');
    const favoriteButton = await screen.findByTestId('favorite-btn');
    const startButton = await screen.findByTestId('start-recipe-btn');
    expect(shareButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
  });
});
