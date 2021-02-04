import React from 'react';
// import fireEvent from '@testing-library/user-event';
import SearchButton from '../pages/login';

describe('Testa se Search Bar é renerizada na página do App de receitas:', () => {
  test('Verifica TextBox', () => {
    const { getByRole } = renderWithRouter(<SearchButton />);

    const INPUTSEARCH = getByRole('textbox');
    expect(INPUTSEARCH).toBeInTheDocument();
  });
  test('Verifica Options', () => {
    const { getByRole } = renderWithRouter(<SearchButton />);

    const RADIOGROUP = getByRole('radiogroup', { name: /option/i });
    expect(RADIOGROUP).toBeInTheDocument();
  });
  test('Verifica botão Busca:', () => {
    const { getByRole } = renderWithRouter(<SearchButton />);

    const SEARCHBTN = getByRole('button', { name: /buscar/i });
    expect(SEARCHBTN).toBeInTheDocument();
  });
});
