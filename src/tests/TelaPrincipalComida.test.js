import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { screen, waitFor } from '@testing-library/react';
import Comidas from '../pages/Comidas';
import { response as mockData } from './mockData';

const apiResponse = Promise.resolve({
    json: () => Promise.resolve(mockData),
    ok: true,
  });

const mockedRecipes = jest.spyOn(global, 'fetch').mockImplementation(() => apiResponse);

afterEach(() => jest.clearAllMocks());

describe('Testa Comidas.js', () => {
  it('Verifica se há um header respeitando os atributos descritos no protótipo', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Comidas />);
    const header = getByRole('banner');
    const profileIcon = getByTestId('profile-top-btn');
    const pageTitle = getByTestId('page-title');
    const searchIcon = getByTestId('search-top-btn');

    expect(header).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    expect(profileIcon.tagName).toBe('A');
    expect(pageTitle.textContent).toBe('Comidas');
    expect(searchIcon.tagName).toBe('BUTTON');
  });
  /*
- Se o radio selecionado for Ingrediente, a busca na API é feita corretamente pelo ingrediente
- Se o radio selecionado for Nome, a busca na API é feita corretamente pelo nome
- Se o radio selecionado for Primeira letra, a busca na API é feita corretamente pelo primeira letra
- Se o radio selecionado for Primeira letra e a busca na API for feita com mais de uma letra, deve-se exibir um alert
- Caso apenas uma comida seja encontrada, deve-se ir para sua rota de detalhes
- Caso nenhuma comida seja encontrada o alert deve ser exibido
- Caso mais de uma bebida seja encontrada, mostrar as 12 primeiras

 */
  it('Verificar se é renderizada 12 receitas', async () => {

    renderWithRouter(<Comidas />);
    const recipeTwelve = await screen.findByTestId('11-recipe-card');
    const recipeNameTwelve = await screen.findByTestId('11-card-name');

    await waitFor(() => {
        expect(recipeTwelve).toContainHTML(0);
        expect(recipeNameTwelve.textContent).toBe('Kapsalon');
      });
  });
});
