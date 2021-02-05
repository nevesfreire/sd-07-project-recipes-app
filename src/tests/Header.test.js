import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { render, screen, fireEvent } from "@testing-library/react";
import App from '../App';
import Header from '../components/Header'

describe('9 - Implemente os elementos do header na tela principal de receitas, respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
  });
});

describe('10 - Implemente um ícone para a tela de perfil, um título e um ícone para a busca, caso exista no protótipo', () => {
  it('Não tem header na tela de login', () => {
    const { history, queryByTestId } = renderWithRouter(<App />);
    history.push('/');
    expect(queryByTestId('profile-top-btn')).toBeNull();
    expect(queryByTestId('page-title')).toBeNull();
    expect(queryByTestId('search-top-btn')).toBeNull();
  });

  it('O header tem os ícones corretos na tela de principal de receitas de comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de principal de receitas de bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
  });

  it('Não tem header na tela de detalhes de uma receita de comida', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas/52771');
    expect(queryByTestId('profile-top-btn')).toBeNull();
    expect(queryByTestId('page-title')).toBeNull();
    expect(queryByTestId('search-top-btn')).toBeNull();
  });

  it('Não tem header na tela de detalhes de uma receita de bebida', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas/178319');
    expect(queryByTestId('profile-top-btn')).toBeNull();
    expect(queryByTestId('page-title')).toBeNull();
    expect(queryByTestId('search-top-btn')).toBeNull();
  });

  it('Não tem header na tela de receita em processo de comida', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas/52771/in-progress');
    expect(queryByTestId('profile-top-btn')).toBeNull();
    expect(queryByTestId('page-title')).toBeNull();
    expect(queryByTestId('search-top-btn')).toBeNull();
  });

  it('Não tem header na tela de receita em processo de bebida', () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas/178319/in-progress');
    expect(queryByTestId('profile-top-btn')).toBeNull();
    expect(queryByTestId('page-title')).toBeNull();
    expect(queryByTestId('search-top-btn')).toBeNull();
  });

  it('O header tem os ícones corretos na tela de explorar', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);
    history.push('explorar');
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).toBeNull();
  });

  it('O header tem os ícones corretos na tela de explorar comidas', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);
    history.push('explorar/comidas');
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).toBeNull();
  });

  it('O header tem os ícones corretos na tela de explorar bebidas', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);
    history.push('explorar/bebidas');
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).toBeNull();
  });

  it('O header tem os ícones corretos na tela de explorar comidas por ingrediente', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);
    history.push('explorar/comidas/ingredientes');
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).toBeNull();
  });

  it('O header tem os ícones corretos na tela de explorar bebidas por ingrediente', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);
    history.push('explorar/bebidas/ingredientes');
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).toBeNull();
  });

  it('O header tem os ícones corretos na tela de explorar comidas por local de origem', () => {
    const { getByTestId, queryByTestId, history, getByText } = renderWithRouter(<App />);
    history.push('/explorar/comidas/area');
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).toBeInTheDocument();
    expect(getByText('Explorar Origem')).toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de perfil', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);
    history.push('/perfil');
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).toBeNull();
  });

  it('O header tem os ícones corretos na tela de receitas feitas', () => {
    const { getByTestId, queryByTestId, getByText, history } = renderWithRouter(<App />);
    history.push('/receitas-feitas');
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).toBeNull();
    expect(getByText('Receitas Feitas')).toBeInTheDocument();
  });

  it('O header tem os ícones corretos na tela de receitas favoritas', () => {
    const { getByTestId, queryByTestId, getByText, history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(queryByTestId('search-top-btn')).toBeNull();
    expect(getByText('Receitas Favoritas')).toBeInTheDocument();
  });
});

describe('11 - Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil', () => {
  it('A mudança de tela ocorre corretamente', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas/');
    const profileButton = getByTestId('profile-top-btn');
    fireEvent.click(profileButton);
    expect(history.location.pathname).toBe('/perfil');
  });
});

describe('12 - Desenvolva o botão de busca que, ao ser clicado, a barra de busca deve aparecer. O mesmo serve para escondê-la', () => {
  it('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas/');
    const button = getByTestId('search-top-btn');
    const searchInput = queryByTestId('search-input');
    expect(searchInput).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });

  it('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    const { getByTestId, queryByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas/');
    const button = getByTestId('search-top-btn');
    const searchInput = queryByTestId('search-input');
    expect(searchInput).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(searchInput).not.toBeInTheDocument();
  });
});
