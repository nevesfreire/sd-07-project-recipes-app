import React from 'react';
import { createBrowserHistory } from 'history';
import Header from '../components/header/Header';
import { render, fireEvent, screen } from './test-utils';
import Login from '../pages/Login';
import ComidasDetalhes from '../pages/comidas/ComidaDetalhes';
import BebidasDetalhes from '../pages/bebidas/BebidasDetalhes';

describe('Testar o componente Header.', () => {
  test('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    render(<Header title="" history={ createBrowserHistory() } />, { initialState: { } });
    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
  });

  test('Verificar se  input de busca aparece após clicar no ícone de buscar', () => {
    render(<Header title="" history={ createBrowserHistory() } />, { initialState: { } });
    const searchButton = screen.getByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const profileTopBtn = screen.getByTestId('profile-top-btn');
    expect(profileTopBtn).toBeInTheDocument();
  });

  test('Não tem header na tela de login', () => {
    const { queryByTestId } = render(<Login history={ createBrowserHistory() } />);
    expect(queryByTestId('Header')).toBeNull();
  });
  test('Não tem header na tela de detalhes de uma receita de comida', () => {
    const { queryByTestId } = render(
      <ComidasDetalhes
        match={ { params: '0' } }
        history={ createBrowserHistory() }
      />,
    );
    expect(queryByTestId('Header')).toBeNull();
  });
  test('Não tem header na tela de detalhes de uma receita de bebidas', () => {
    const { queryByTestId } = render(
      <BebidasDetalhes match={ { params: '0' } } history={ createBrowserHistory() } />,
    );
    expect(queryByTestId('Header')).toBeNull();
  });
});
