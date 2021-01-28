/* import React from 'react';
import renderWithRouter from './renderWithRouter';
import { Login, MainPage, RecipeDetails } from '../../pages/index';

const searchTopBtn = 'search-top-btn';
const pageTitle = 'page-title';
const loginSubmitBtn = 'login-submit-btn';

describe('[HEADER TESTE] Não deve ser renderizado um header na tela de login', () => {
  it('Não deve conter os data-testids do header na página', () => {
    const { queryByTestId } = renderWithRouter({ component: <Login />, route: '/' });
    expect(queryByTestId(searchTopBtn)).not.toBeInTheDocument();
    expect(queryByTestId(pageTitle)).not.toBeInTheDocument();
    expect(queryByTestId(loginSubmitBtn)).not.toBeInTheDocument();
  });
});

describe('[HEADER TESTE] Implemente um header na tela principal de receitas', () => {
  it('O Header deve conter um botão com data-testids de `profile-top-btn`', () => {
    const { getByTestId } = renderWithRouter({
      component: <MainPage />,
      route: '/comidas',
    });
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
  });
  it('O Header deve conter um título com data-testids de `page-title` em comidas', () => {
    const { getByTestId } = renderWithRouter({
      component: <MainPage />,
      route: '/comidas',
    });
    expect(getByTestId(pageTitle)).toBeInTheDocument();
  });
  it('O Header deve conter um botão com data-testids de `search-top-btn`', () => {
    const { getByTestId } = renderWithRouter({
      component: <MainPage />,
      route: '/comidas',
    });
    expect(getByTestId(searchTopBtn)).toBeInTheDocument();
  });
  it('O Header deve conter um botão com data-testids de `profile-top-btn`', () => {
    const { getByTestId } = renderWithRouter({
      component: <MainPage />,
      route: '/comidas',
    });
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
  });
  it('O Header deve conter um título com data-testids de `page-title`', () => {
    const { getByTestId } = renderWithRouter({
      component: <MainPage />,
      route: '/comidas',
    });
    expect(getByTestId(pageTitle)).toBeInTheDocument();
  });
  it('O Header deve conter um botão com data-testids de `search-top-btn`', () => {
    const { getByTestId } = renderWithRouter({
      component: <MainPage />,
      route: '/comidas',
    });
    expect(getByTestId(searchTopBtn)).toBeInTheDocument();
  });
});

describe('[HEADER TESTE] Não existe um header na tela de detalhes', () => {
  it('Não deve ter uma tag header dentro de detalhes de comida`', () => {
    const { queryByTestId } = renderWithRouter({
      component: <RecipeDetails />,
      route: '/comidas/25',
    });
    expect(queryByTestId(searchTopBtn)).not.toBeInTheDocument();
    expect(queryByTestId(pageTitle)).not.toBeInTheDocument();
    expect(queryByTestId(loginSubmitBtn)).not.toBeInTheDocument();
  });
  it('Não deve ter uma tag header dentro de detalhes de bebida`', () => {
    const { queryByTestId } = renderWithRouter({component: <RecipeDetails />, route: '/bebidas/25' });
    expect(queryByTestId(searchTopBtn)).not.toBeInTheDocument();
    expect(queryByTestId(pageTitle)).not.toBeInTheDocument();
    expect(queryByTestId(loginSubmitBtn)).not.toBeInTheDocument();
  });
});

describe('[HEADER TESTE] Não existe um header na tela de receitas em progresso', () => {
  it('Não deve ter uma tag header dentro de detalhes de bebida`', () => {
    const { queryByTestId } = renderWithRouter({
      component: <inProgressRecipes />,
      route: '/comidas/25/in-progress',
    });
    expect(queryByTestId(searchTopBtn)).not.toBeInTheDocument();
    expect(queryByTestId(pageTitle)).not.toBeInTheDocument();
    expect(queryByTestId(loginSubmitBtn)).not.toBeInTheDocument();
  });
});

describe('[HEADER TESTE] Não existe um header na tela de receitas (comida/bebida)', () => {

});

describe('[HEADER TESTE] Header tem itens corretos na tela de explorar', () => {

});

describe('[HEADER TESTE] Header tem itens corretos na tela de explorar (comidas/bebidas)', () => {

});

describe('[HEADER TESTE] Header tem itens corretos na tela de explorar (comidas/bebidas por ingredientes)', () => {

});

describe('[HEADER TESTE] Header tem itens corretos na tela de explorar (comidas/bebidas por local de origem)', () => {

});

describe('[HEADER TESTE] Header tem itens corretos na tela de perfil', () => {

});

describe('[HEADER TESTE] Header tem itens corretos na tela de receitas feitas', () => {

});

describe('[HEADER TESTE] Header tem itens corretos na tela de receitas favoritas)', () => {

});
 */
