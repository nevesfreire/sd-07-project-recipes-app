import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { screen, fireEvent, getByTestId } from '@testing-library/react';
import Comidas from '../pages/Comidas';


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
  it('Verificar se é renderizada 12 receitas', async () => {

    renderWithRouter(<Comidas />);
    const recipeTwelve = await screen.findByTestId('11-recipe-card');
    const recipeNameTwelve = await screen.findByTestId('11-card-name');
    const recipeOne = await screen.findByTestId('0-recipe-card');
    const recipeNameOne = await screen.findByTestId('0-card-name');

    expect(recipeOne).toContainHTML(0);
    expect(recipeNameOne.textContent).toBe('Corba');

    expect(recipeTwelve).toContainHTML(0);
    expect(recipeNameTwelve.textContent).toBe('Kapsalon');
  });

  it(('Pesquisar receitas por ingredite'), async () => {
    renderWithRouter(<Comidas />);
    const searchIcon = getByTestId('search-top-btn');


    fireEvent.click(searchIcon);

    const inputTextSearch = getByTestId('search-input');
    const radioIngredient = getByTestId('ingredient-search-radio');
    const radioName = getByTestId('name-search-radio');
    const radioFisrtLetter = getByTestId('first-letter-search-radio');
    const execShearch = getByTestId('exec-search-btn');

    expect(inputTextSearch).toBeInTheDocument();
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFisrtLetter).toBeInTheDocument();
    expect(execShearch).toBeInTheDocument();

    userEvent.type(inputTextSearch, 'onion');
  });
});


  /*
- Se o radio selecionado for Ingrediente, a busca na API é feita corretamente pelo ingrediente
- Se o radio selecionado for Nome, a busca na API é feita corretamente pelo nome
- Se o radio selecionado for Primeira letra, a busca na API é feita corretamente pelo primeira letra
- Se o radio selecionado for Primeira letra e a busca na API for feita com mais de uma letra, deve-se exibir um alert
- Caso apenas uma comida seja encontrada, deve-se ir para sua rota de detalhes
- Caso nenhuma comida seja encontrada o alert deve ser exibido
 */