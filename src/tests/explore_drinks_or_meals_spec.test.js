import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { ExploreDrinks, ExploreFoods } from '../pages';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

const botaoIngrediente = 'explore-by-ingredient';
const botaoLocal = 'explore-by-area';
const botaoSurpreenda = 'explore-surprise';
const textoIngrediente = 'Por Ingredientes';
const textoLocal = 'Por Local de Origem';
const textoSurpreenda = 'Me Surpreenda!';

describe('As telas de Explorar devem:', () => {
  it('ter 3 botões quando a tela for de Comidas', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoods />);

    const ingrediente = getByTestId(botaoIngrediente);
    const local = getByTestId(botaoLocal);
    const surpreenda = getByTestId(botaoSurpreenda);

    expect(ingrediente).toBeInTheDocument();
    expect(local).toBeInTheDocument();
    expect(surpreenda).toBeInTheDocument();
  });

  it('ter 2 botões quando a tela for de Bebidas', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);

    const ingrediente = getByTestId(botaoIngrediente);
    const surpreenda = getByTestId(botaoSurpreenda);

    expect(ingrediente).toBeInTheDocument();
    expect(surpreenda).toBeInTheDocument();
  });

  it('ter os nomes corretos para os botões na tela de Comidas', () => {
    const { getByTestId } = renderWithRouter(<ExploreFoods />);

    const ingrediente = getByTestId(botaoIngrediente);
    const local = getByTestId(botaoLocal);
    const surpreenda = getByTestId(botaoSurpreenda);

    expect(ingrediente.textContent).toBe(textoIngrediente);
    expect(local.textContent).toBe(textoLocal);
    expect(surpreenda.textContent).toBe(textoSurpreenda);
  });

  it('ter os nomes corretos para os botões na tela de Bebidas', () => {
    const { getByTestId } = renderWithRouter(<ExploreDrinks />);

    const ingrediente = getByTestId(botaoIngrediente);
    const surpreenda = getByTestId(botaoSurpreenda);
    expect(ingrediente.textContent).toBe(textoIngrediente);
    expect(surpreenda.textContent).toBe(textoSurpreenda);
  });

  it('ter o botão de link para a tela de Explorar Por Ingredientes em Comidas',
    () => {
      const { getByTestId, history } = renderWithRouter(<ExploreFoods />);

      const ingrediente = getByTestId(botaoIngrediente);
      fireEvent.click(ingrediente);
      const { pathname } = history.location;

      const explorarPorIngrediente = '/explorar/comidas/ingredientes';

      expect(pathname).toBe(explorarPorIngrediente);
    });

  it('ter o botão de link para a tela de Explorar Por Ingredientes em Bebidas',
    () => {
      const { getByTestId, history } = renderWithRouter(<ExploreDrinks />);

      const ingrediente = getByTestId(botaoIngrediente);
      fireEvent.click(ingrediente);
      const { pathname } = history.location;

      const explorarPorIngrediente = '/explorar/bebidas/ingredientes';

      expect(pathname).toBe(explorarPorIngrediente);
    });

  it('ter o botão de link para a tela de Explorar Por Local em Comidas',
    () => {
      const { getByTestId, history } = renderWithRouter(<ExploreFoods />);

      const local = getByTestId(botaoLocal);
      fireEvent.click(local);
      const { pathname } = history.location;

      const explorarPorLocal = '/explorar/comidas/area';

      expect(pathname).toBe(explorarPorLocal);
    });

  it('em Comidas, ter o botão de Me Surpreenda para o detalhe de uma comida aleatória',
    () => {
      const { getByTestId, history } = renderWithRouter(<ExploreFoods />);
      const foodAPI = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const foodAleatoria = { id: 123123 };

      global.fetch = jest.fn(async () => ({
        json: foodAleatoria,
      }));
      const fetchApi = global.fetch;

      const surpreenda = getByTestId(botaoSurpreenda);
      fireEvent.click(surpreenda);
      const { pathname } = history.location;

      const detalheComida = `/comidas/${foodAleatoria.id}`;

      expect(fetchApi).toBeCalledTimes(1);
      expect(fetchApi).toBeCalledWith(foodAPI);
      expect(pathname).toBe(detalheComida);
    });

  it('em Bebidas, ter o botão de Me Surpreenda para o detalhe de uma bebida aleatória',
    () => {
      const { getByTestId, history } = renderWithRouter(<ExploreDrinks />);
      const drinkAPI = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const drinkAleatoria = { id: 123123 };

      global.fetch = jest.fn(async () => ({
        json: drinkAleatoria,
      }));
      const fetchApi = global.fetch;

      const surpreenda = getByTestId(botaoSurpreenda);
      fireEvent.click(surpreenda);
      const { pathname } = history.location;

      const detalheBebida = `/bebidas/${drinkAleatoria.id}`;

      expect(fetchApi).toBeCalledTimes(1);
      expect(fetchApi).toBeCalledWith(drinkAPI);
      expect(pathname).toBe(detalheBebida);
    });
});
