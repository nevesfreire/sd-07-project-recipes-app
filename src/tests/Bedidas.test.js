import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Bebidas from '../pages/Bebidas';

global.alert = jest.fn() 


describe('Testa Bebidas.js', () => {
  it('Verifica se há um header respeitando os atributos descritos no protótipo', () => {
     renderWithRouter(<Bebidas />);
    const header = screen.getByRole('banner');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    const searchIcon = screen.getByTestId('search-top-btn');

    expect(header).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    expect(profileIcon.tagName).toBe('A');
    expect(pageTitle.textContent).toBe('Bebidas');
    expect(searchIcon.tagName).toBe('BUTTON');
  });
  it('Verificar se é renderizada 12 bebidas', async () => {

    renderWithRouter(<Bebidas />);
    const recipeTwelve = await screen.findByTestId('11-recipe-card');
    const recipeNameTwelve = await screen.findByTestId('11-card-name');
    const recipeOne = await screen.findByTestId('0-recipe-card');
    const recipeNameOne = await screen.findByTestId('0-card-name');

    expect(recipeOne).toContainHTML(0);
    expect(recipeNameOne.textContent).toBe('GG');

    expect(recipeTwelve).toContainHTML(0);
    expect(recipeNameTwelve.textContent).toBe('B-52');
  });
  it(('Pesquisar receitas por ingredite'), async () => {
    renderWithRouter(<Bebidas />);
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

    userEvent.type(inputTextSearch, 'Lemon');
    userEvent.click(radioIngredient)
    fireEvent.click(execShearch);

    const recipeTwelve = await screen.findByTestId('11-recipe-card');
    const recipeNameTwelve = await screen.findByTestId('11-card-name');
    const recipeOne = await screen.findByTestId('0-recipe-card');
    const recipeNameOne = await screen.findByTestId('0-card-name');


    expect(recipeOne).toContainHTML(0);
    expect(recipeNameOne.textContent).toBe('A True Amaretto Sour');

    expect(recipeTwelve).toContainHTML(0);
    expect(recipeNameTwelve.textContent).toBe('Grape lemon');

  });
  it('Pesquisar bebidas por nome', async() => {
    renderWithRouter(<Bebidas />);
    const searchIcon = screen.getByTestId('search-top-btn');


    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const execShearch = screen.getByTestId('exec-search-btn');

    expect(inputTextSearch).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(execShearch).toBeInTheDocument();

    userEvent.type(inputTextSearch, 'Ace');
    userEvent.click(radioName)
    fireEvent.click(execShearch);

    const recipeOne = await screen.findByTestId('0-recipe-card');
    const recipeNameOne = await screen.findByTestId('0-card-name');

    const recipeTwo = await screen.findByTestId('1-recipe-card');
    const recipeNameTwo = await screen.findByTestId('1-card-name');

    const recipeThree = await screen.findByTestId('2-recipe-card');
    const recipeNameThree = await screen.findByTestId('2-card-name');

    expect(recipeOne).toContainHTML(0);
    expect(recipeNameOne.textContent).toBe('Ace');

    expect(recipeTwo).toContainHTML(0);
    expect(recipeNameTwo.textContent).toBe('Angel Face');

    expect(recipeThree).toContainHTML(0);
    expect(recipeNameThree.textContent).toBe('Space Odyssey');
  });
  it('Pesquisar bebidas pela primeira letra corretamente', async () => {
    renderWithRouter(<Bebidas />);
    const searchIcon = screen.getByTestId('search-top-btn');

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId('search-input');

    const radioFisrtLetter = screen.getByTestId('first-letter-search-radio');
    const execShearch = screen.getByTestId('exec-search-btn');

    expect(inputTextSearch).toBeInTheDocument();
    expect(radioFisrtLetter).toBeInTheDocument();
    expect(execShearch).toBeInTheDocument();

    userEvent.type(inputTextSearch, 'W');
    userEvent.click(radioFisrtLetter)
    fireEvent.click(execShearch);

    const recipeOne = await screen.findByTestId('0-recipe-card');
    const recipeNameOne = await screen.findByTestId('0-card-name');

    const recipeEigth = await screen.findByTestId('8-recipe-card');
    const recipeNameEigth = await screen.findByTestId('8-card-name');

    expect(recipeOne).toContainHTML(0);
    expect(recipeNameOne.textContent).toBe('Whisky Mac');

    expect(recipeEigth).toContainHTML(0);
    expect(recipeNameEigth.textContent).toBe('Waikiki Beachcomber');
  });
  it('Pesquisar bebidas pela primeira letra de forma incorreta deve aparecer um alerta', async () => {
    renderWithRouter(<Bebidas />);
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
  
  it('Caso uma bebida seja encontrada, deve-se ir para rota de detalhes', async() => {
    const { history } = renderWithRouter(<Bebidas />);
    const searchIcon = screen.getByTestId('search-top-btn');

    fireEvent.click(searchIcon);

    const inputTextSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const execShearch = screen.getByTestId('exec-search-btn');

    userEvent.type(inputTextSearch, 'A1');
    userEvent.click(radioName)
    fireEvent.click(execShearch);

    await screen.findByText('A1')

    expect(history.location.pathname).toBe('/bebidas/17222');
  })
});
  /*
- Caso nenhuma comida seja encontrada o alert deve ser exibido
 */