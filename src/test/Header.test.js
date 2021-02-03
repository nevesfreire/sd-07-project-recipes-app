import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderWithRouter from '../renderWithRouter';
import Header from '../components/header/Header';
import store from '../redux/store';

describe('Testar os headers', () => {
  test('Verificar se possui os data-Testid do page, profile e search exigidos', () => {
    const { getByTestId } = renderWithRouter(
      <Provider store={ store }>
        <Header />
      </Provider>,
    );
    const h1 = getByTestId('page-title');
    expect(h1).toBeInTheDocument();

    const searchInput = getByTestId('search-top-btn');
    expect(searchInput).toBeInTheDocument();

    const profileButton = getByTestId('profile-top-btn');
    expect(profileButton).toBeInTheDocument();
  });
  test('Verificar se  input de busca aparece após clicar no ícone de buscar', () => {
    const { getByTestId } = renderWithRouter(
      <Provider store={ store }>
        <Header />
      </Provider>,
    );
    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const profileTopBtn = getByTestId('profile-top-btn');
    expect(profileTopBtn).toBeInTheDocument();
  });
});
