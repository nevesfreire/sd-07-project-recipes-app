import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import MainRecipes from '../pages/MainRecipes';

beforeEach(() => {
  cleanup();
  const { getByTestId, history } = renderWithRouter(<Login store={ store } />);
  fireEvent.change(getByTestId(emailInput), { target:
      { value: 'email@teste.com' } });
  fireEvent.change(getByTestId(passwordInput), { target: { value: '1234567' } });
  fireEvent.click(getByTestId(loginInput));
});

describe('9 - Implemente os elementos do header na tela principal de receitas, '
+ 'respeitando os atributos descritos no protótipo', () => {
  test('Tem os data-testids `profile-top-btn`, `page-title` e `search-top-btn`', () => {
    const { getByTestId } = renderWithRouter(<MainRecipes />);
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
  });
});
