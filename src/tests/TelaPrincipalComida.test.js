import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { screen, fireEvent, cleanup, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Comidas from '../pages/Comidas';

afterEach(cleanup);

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
    const { getByTestId } =renderWithRouter(<Comidas />);
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

    userEvent.type(inputTextSearch, 'Carrots');
    userEvent.click(radioIngredient)
    fireEvent.click(execShearch);

    const recipeTwelve = await screen.findByTestId('11-recipe-card');
    const recipeNameTwelve = await screen.findByTestId('11-card-name');
    const recipeOne = await screen.findByTestId('0-recipe-card');
    const recipeNameOne = await screen.findByTestId('0-card-name');


    expect(recipeOne).toContainHTML(0);
    expect(recipeNameOne.textContent).toBe('Beef and Mustard Pie');

    expect(recipeTwelve).toContainHTML(0);
    expect(recipeNameTwelve.textContent).toBe('Creamy Tomato Soup');

  });
  it('Pesquisar receitas por nome', async() => {
    const { getByTestId } =renderWithRouter(<Comidas />);
    const searchIcon = getByTestId('search-top-btn');


    fireEvent.click(searchIcon);

    const inputTextSearch = getByTestId('search-input');
    const radioName = getByTestId('name-search-radio');
    const execShearch = getByTestId('exec-search-btn');

    expect(inputTextSearch).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(execShearch).toBeInTheDocument();

    userEvent.type(inputTextSearch, 'Mac');
    userEvent.click(radioName)
    fireEvent.click(execShearch);

    const recipeOne = await screen.findByTestId('0-recipe-card');
    const recipeNameOne = await screen.findByTestId('0-card-name');

    const recipeTwo = await screen.findByTestId('1-recipe-card');
    const recipeNameTwo = await screen.findByTestId('1-card-name');

    const recipeThree = await screen.findByTestId('2-recipe-card');
    const recipeNameThree = await screen.findByTestId('2-card-name');

    expect(recipeOne).toContainHTML(0);
    expect(recipeNameOne.textContent).toBe('Big Mac');

    expect(recipeTwo).toContainHTML(0);
    expect(recipeNameTwo.textContent).toBe('Chicken Fajita Mac and Cheese');
    
    expect(recipeOne).toContainHTML(0);
    expect(recipeNameOne.textContent).toBe('Big Mac');

    expect(recipeThree).toContainHTML(0);
    expect(recipeNameThree.textContent).toBe('Grilled Mac and Cheese Sandwich');
  });
  it('Pesquisar receitas pela primeira letra corretamente', async () => {
    const { getByTestId } =renderWithRouter(<Comidas />);
    const searchIcon = getByTestId('search-top-btn');

    fireEvent.click(searchIcon);

    const inputTextSearch = getByTestId('search-input');

    const radioFisrtLetter = getByTestId('first-letter-search-radio');
    const execShearch = getByTestId('exec-search-btn');

    expect(inputTextSearch).toBeInTheDocument();
    expect(radioFisrtLetter).toBeInTheDocument();
    expect(execShearch).toBeInTheDocument();

    userEvent.type(inputTextSearch, 'A');
    userEvent.click(radioFisrtLetter)
    fireEvent.click(execShearch);

    const recipeOne = await screen.findByTestId('0-recipe-card');
    const recipeNameOne = await screen.findByTestId('0-card-name');

    const recipeTwo = await screen.findByTestId('1-recipe-card');
    const recipeNameTwo = await screen.findByTestId('1-card-name');

    expect(recipeOne).toContainHTML(0);
    expect(recipeNameOne.textContent).toBe('Apple Frangipan Tart');

    expect(recipeTwo).toContainHTML(0);
    expect(recipeNameTwo.textContent).toBe('Apple & Blackberry Crumble');
  });
  it('Pesquisar receitas pela primeira letra de forma incorreta', async () => {
    const { getByTestId, getByRole } =renderWithRouter(<Comidas />);
    const searchIcon = getByTestId('search-top-btn');

    fireEvent.click(searchIcon);

    const inputTextSearch = getByTestId('search-input');
    const radioFisrtLetter = getByTestId('first-letter-search-radio');
    const execShearch = getByTestId('exec-search-btn');

    expect(inputTextSearch).toBeInTheDocument();
    expect(radioFisrtLetter).toBeInTheDocument();
    expect(execShearch).toBeInTheDocument();

    userEvent.type(inputTextSearch, 'AB');
    userEvent.click(radioFisrtLetter)
    fireEvent.click(execShearch);

    const alert = await screen.findByText('Sua busca deve conter somente 1 (um) caracter')

    expect(alert).toBeInTheDocument()
  });
});


  /*
- Se o radio selecionado for Primeira letra e a busca na API for feita com mais de uma letra, deve-se exibir um alert
- Caso apenas uma comida seja encontrada, deve-se ir para sua rota de detalhes
- Caso nenhuma comida seja encontrada o alert deve ser exibido
 */