import React from 'react';
import { createBrowserHistory } from 'history';
import renderWithRouter from './renderWithRouter';
import { Header } from '../index';
import { Login, MainPage, RecipeDetails, inProgressRecipes } from '../../pages/index';

describe('[HEADER TESTE] Não deve ser renderizado um header na tela de login', () => {
  it('Não deve conter os data-testids do header na página', () => {
    const { queryByTestId } = renderWithRouter({component: <Login />, route: '/' });
    expect(queryByTestId('search-top-btn')).not.toBeInTheDocument();
    expect(queryByTestId('page-title')).not.toBeInTheDocument();
    expect(queryByTestId('login-submit-btn')).not.toBeInTheDocument();
  });
});

describe('[HEADER TESTE] Implemente um header na tela principal de receitas tanto de comidas', () => {
  it('O Header deve conter um botão com data-testids de `profile-top-btn`', () => {
    const { getByTestId } = renderWithRouter({component: <MainPage />, route: '/comidas' });
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
  });
  it('O Header deve conter um título com data-testids de `page-title` em comidas', () => {
    const { getByTestId } = renderWithRouter({component: <MainPage /> , route: '/comidas' });
    expect(getByTestId('page-title')).toBeInTheDocument();
  });
  it('O Header deve conter um botão com data-testids de `search-top-btn`  em comidas', () => {
    const { getByTestId } = renderWithRouter({component: <MainPage />, route: '/comidas' });
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
  });
  it('O Header deve conter um botão com data-testids de `profile-top-btn` em bebidas', () => {
    const { getByTestId } = renderWithRouter({component: <MainPage />, route: '/comidas' });
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
  });
  it('O Header deve conter um título com data-testids de `page-title` em bebidas', () => {
    const { getByTestId } = renderWithRouter({component: <MainPage />, route: '/comidas' });
    expect(getByTestId('page-title')).toBeInTheDocument();
  });
  it('O Header deve conter um botão com data-testids de `search-top-btn` em bebidas', () => {
    const { getByTestId } = renderWithRouter({component: <MainPage />, route: '/comidas' });
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
  });
});

describe('[HEADER TESTE] Não existe um header na tela de detalhes', () => {
  it('Não deve ter uma tag header dentro de detalhes de comida`', () => {
    const { queryByTestId } = renderWithRouter({component: <RecipeDetails />, route: '/comidas/25' });
    expect(queryByTestId('search-top-btn')).not.toBeInTheDocument();
    expect(queryByTestId('page-title')).not.toBeInTheDocument();
    expect(queryByTestId('login-submit-btn')).not.toBeInTheDocument();
  });
  it('Não deve ter uma tag header dentro de detalhes de bebida`', () => {
    const { queryByTestId } = renderWithRouter({component: <RecipeDetails />, route: '/bebidas/25' });
    expect(queryByTestId('search-top-btn')).not.toBeInTheDocument();
    expect(queryByTestId('page-title')).not.toBeInTheDocument();
    expect(queryByTestId('login-submit-btn')).not.toBeInTheDocument();
  });
});

describe('[HEADER TESTE] Não existe um header na tela de receitas em progresso', () => {
  it('Não deve ter uma tag header dentro de detalhes de bebida`', () => {
    const { queryByTestId } = renderWithRouter({component: <inProgressRecipes />, route: '/comidas/25/in-progress' });
    expect(queryByTestId('search-top-btn')).not.toBeInTheDocument();
    expect(queryByTestId('page-title')).not.toBeInTheDocument();
    expect(queryByTestId('login-submit-btn')).not.toBeInTheDocument();
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
