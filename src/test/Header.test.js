import React from 'react';
import { createMemoryHistory } from 'history';
import Header from '../components/header/Header';
import Header2 from '../components/header/Header2';
import { render, fireEvent, screen } from './test-utils';
import Login from '../pages/Login';
import ComidasDetalhes from '../pages/comidas/ComidaDetalhes';
import BebidasDetalhes from '../pages/bebidas/BebidasDetalhes';

describe('Testar o componente Header.', () => {
  test('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    render(<Header title="" history={ createMemoryHistory() } />, { initialState: { } });
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });

  test('Verificar se  input de busca aparece após clicar no ícone de buscar', () => {
    render(<Header title="" history={ createMemoryHistory() } />, { initialState: { } });
    const searchButton = screen.getByTestId('search-top-btn');
    fireEvent.click(searchButton);
  });

  test('Não tem header na tela de login', () => {
    const { queryByTestId } = render(<Login history={ createMemoryHistory() } />);
    expect(queryByTestId('Header')).toBeNull();
  });
  test('Não tem header na tela de detalhes de uma receita de comida', () => {
    const { queryByTestId } = render(
      <ComidasDetalhes
        match={ { params: '0' } }
        history={ createMemoryHistory() }
      />,
    );
    expect(queryByTestId('Header')).toBeNull();
  });
  test('Não tem header na tela de detalhes de uma receita de bebidas', () => {
    const { queryByTestId } = render(
      <BebidasDetalhes match={ { params: '0' } } history={ createMemoryHistory() } />,
    );
    expect(queryByTestId('Header')).toBeNull();
  });
  test('Redirecione o usuario à tela de perfil ao clicar no botão de perfil', () => {
    render(<Header title="" history={ createMemoryHistory() } />, { initialState: { } });
    const profileButton = screen.getByTestId('profile-top-btn');
    fireEvent.click(profileButton);
  });
  test('Verificar se no header2 tem o caminho para perfil', () => {
    render(<Header2 title="" history={ createMemoryHistory() } />, { initialState: { } });
    const profileBtnTop = screen.getByTestId('profile-top-btn');
    fireEvent.click(profileBtnTop);
  });
});
