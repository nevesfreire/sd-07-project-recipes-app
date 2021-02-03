import React from 'react';
// import fireEvent from '@testing-library/user-event';
import Login from '../pages/login';

describe('Testa se Search Bar é renerizada na página do App de receitas:', () => {
  test('Verifica TextBox', () => {

    getByRole('textbox');
  });
  test('Verifica Options', () => {

    getByRole('radiogroup', { name: /option/i });
  });
  test('Verifica botão Busca:', () => {

    getByRole('button', { name: /buscar/i });
  });
});
