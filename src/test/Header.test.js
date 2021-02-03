import React from 'react';
import {cleanup, fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Header from '../components/header/Header';
import Login from '../pages/Login';
import Comidas from '../pages/comidas/Comidas';

afterEach(cleanup);

describe('Verificar atributos no Header', () => {
  test('Não deve ter header na tela de login', () => {
    const { queryByTestId } = render(<Login />);
    expect(queryByTestId('Header')).toBeNull();
  });

  test('Não tem header na tela de receita em processo de bebida', () => {
    const { queryByTestId } = render(<ProcessoBebidas />);
    expect(queryByTestId('Header')).toBeNull();
  });
/*
    test('A pagina deve ter os ícones corretos na tela de principal de receitas de bebidas', () => {
    });
    
    test('Não deve ter header na tela de detalhes de uma receita de comida', () => {
    });
    test('Não teve ter header na tela de detalhes de uma receita de bebida', () => {
    });
*/
});