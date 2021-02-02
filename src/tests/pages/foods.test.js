import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import App from '../../App';

import { renderWithRouterAndStore } from '../testConfig';

describe('1 - [PÁGINA DE COMIDA] Crie uma pagina de comida com os seguintes campos e características:', () => {
  test('A rota para esta página deve ser \'/comida\'', () => {
    const { history } = renderWithRouterAndStore(<App />);
    expect(history.location.pathname).toBe('/comidas');
  });

  test('Verifica se possui link para pagina de perfil', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });
  test('Verifica se renderiza a imagem do perfil da pessoa usuária', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se possui titulo da pagina', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se possui campo de busca da pagina', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se pussui radio button para campo ingredientes', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se pussui radio button para campo nome', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se pussui radio button para campo primeira letra', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se pussui button para pesquisar', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se ao clicar no button para pesquisar o campo de pesquisa aparece na tela', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se ao clicar no button para pesquisar o campo de pesquisa desaparece da tela', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se ao digitar o ingrediente e clicar no button pesquisar, é feita a pesquisa', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se caso apenas uma receita for encontrada a pagina é redirecionada para a tela detalhes daquela receita', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se caso renderiza os cards das receitas caso mais de uma receita é encontrada', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se o máximo de receitas encontradas é 12', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se exibe alert caso nenhuma receita seja encontrada', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se renderiza a foto e o nome da comida', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se possui botão para com link tela de bebidas', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se possui botão para com link tela de explorar', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  test('Verifica se possui caso estivier na tela comida, o botão para com link tela de comida deve estar oculto', () => {
    renderWithRouterAndStore(<App />, '/comidas');
    
  });

  
});
