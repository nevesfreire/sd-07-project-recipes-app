import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { screen, fireEvent, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Comidas from '../pages/Comidas';

global.alert = jest.fn() 


describe('Testa Comidas.js', () => {
  it('Verifica se há um header respeitando os atributos descritos no protótipo', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Comidas />);
    const header = screen.getByRole('banner');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchIcon = screen.getByTestId('search-top-btn');

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
    const searchIcon = screen.getByTestId('search-top-btn');


    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId('search-input');
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const radioFisrtLetter = screen.getByTestId('first-letter-search-radio');
    const execShearch = screen.getByTestId('exec-search-btn');

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
    renderWithRouter(<Comidas />);
    const searchIcon = screen.getByTestId('search-top-btn');

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const execShearch = screen.getByTestId('exec-search-btn');

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

    expect(recipeThree).toContainHTML(0);
    expect(recipeNameThree.textContent).toBe('Grilled Mac and Cheese Sandwich');
  });
  it('Pesquisar receitas pela primeira letra corretamente', async () => {
    const { getByTestId } =renderWithRouter(<Comidas />);
    const searchIcon = screen.getByTestId('search-top-btn');

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId('search-input');

    const radioFisrtLetter = screen.getByTestId('first-letter-search-radio');
    const execShearch = screen.getByTestId('exec-search-btn');

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
  it('Pesquisar receitas pela primeira letra de forma incorreta deve aparecer um alerta', async () => {
    const { getByTestId } =renderWithRouter(<Comidas />);
    const searchIcon = screen.getByTestId('search-top-btn');

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId('search-input');
    const radioFisrtLetter = screen.getByTestId('first-letter-search-radio');
    const execShearch = screen.getByTestId('exec-search-btn');

    expect(inputTextSearch).toBeInTheDocument();
    expect(radioFisrtLetter).toBeInTheDocument();
    expect(execShearch).toBeInTheDocument();

    userEvent.type(inputTextSearch, 'AB');
    userEvent.click(radioFisrtLetter)
    fireEvent.click(execShearch);

    expect(global.alert).toHaveBeenCalledTimes(1)
  });
  it('Caso uma comida seja encontrada, deve-se ir para rota de detalhes', async() => {
    const { history } = renderWithRouter(<Comidas />);
    const searchIcon = screen.getByTestId('search-top-btn');

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const execShearch = screen.getByTestId('exec-search-btn');

    userEvent.type(inputTextSearch, 'Corba');
    userEvent.click(radioName)
    fireEvent.click(execShearch);

    await screen.findByText('Corba')

    expect(history.location.pathname).toBe('/comidas/52977');
  })
});
  /*
- Caso apenas uma comida seja encontrada, deve-se ir para sua rota de detalhes
 */