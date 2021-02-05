import React from 'react';
import renderWithRouter from '../renderWithRouter';
import Bebidas from '../pages/Bebidas';
import Comidas from '../pages/Comidas';
import BebidasExplorar from '../pages/BebidasExplorar';
import ComidasExplorar from '../pages/ComidasExplorar';
import BebidasIngredientes from '../pages/BebidasIngredientes';
import ComidasIngredientes from '../pages/ComidasIngredientes';
import ComidasArea from '../pages/ComidasArea';
import Explorar from '../pages/Explorar';
import BebidasDetalhes from '../pages/BebidasDetalhes';
import ComidasDetalhes from '../pages/ComidasDetalhes';
import BebidasProcesso from '../pages/BebidasProcesso';
import ComidasProcesso from '../pages/ComidasProcesso';

const pageTitleTestId = 'page-title';
const profileButtonTestId = 'profile-top-btn';

describe('Testa o componente Header', () => {
  it('Testa se a pagina de comidas renderdiza o header de forma correta', () => {
    const { getByTestId } = renderWithRouter(<Comidas />);

    const headerTitle = getByTestId(pageTitleTestId);
    expect(headerTitle.textContent).toBe('Comidas');

    const profileButton = getByTestId(profileButtonTestId);
    expect(profileButton).toBeInTheDocument();

    const searchButton = getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
  });

  it('Testa se a pagina de bebidas renderdiza o header de forma correta', () => {
    const { getByTestId } = renderWithRouter(<Bebidas />);

    const headerTitle = getByTestId(pageTitleTestId);
    expect(headerTitle.textContent).toBe('Bebidas');

    const profileButton = getByTestId(profileButtonTestId);
    expect(profileButton).toBeInTheDocument();

    const searchButton = getByTestId('search-top-btn');
    expect(searchButton).toBeInTheDocument();
  });

  it('Testa se a pagina de bebidas Explorar renderdiza o header corretamente', () => {
    const { getByTestId } = renderWithRouter(<BebidasExplorar />);

    const headerTitle = getByTestId(pageTitleTestId);
    expect(headerTitle.textContent).toBe('Explorar Bebidas');

    const profileButton = getByTestId(profileButtonTestId);
    expect(profileButton).toBeInTheDocument();
  });

  it('Testa se a pagina de comidas Explorar renderdiza o header corretamente', () => {
    const { getByTestId } = renderWithRouter(<ComidasExplorar />);

    const headerTitle = getByTestId(pageTitleTestId);
    expect(headerTitle.textContent).toBe('Explorar Comidas');

    const profileButton = getByTestId(profileButtonTestId);
    expect(profileButton).toBeInTheDocument();
  });

  it('Testa se a pagina de bebidas Ingredients renderdiza o header corretamente', () => {
    const { getByTestId } = renderWithRouter(<BebidasIngredientes />);

    const headerTitle = getByTestId(pageTitleTestId);
    expect(headerTitle.textContent).toBe('Explorar Ingredientes');

    const profileButton = getByTestId(profileButtonTestId);
    expect(profileButton).toBeInTheDocument();
  });

  it('Testa se a pagina de comidas Ingredients renderdiza o header corretamente', () => {
    const { getByTestId } = renderWithRouter(<ComidasIngredientes />);

    const headerTitle = getByTestId(pageTitleTestId);
    expect(headerTitle.textContent).toBe('Explorar Ingredientes');

    const profileButton = getByTestId(profileButtonTestId);
    expect(profileButton).toBeInTheDocument();
  });

  it('Testa se a pagina de comidas Areas renderdiza o header corretamente', () => {
    const { getByTestId } = renderWithRouter(<ComidasArea />);

    const headerTitle = getByTestId(pageTitleTestId);
    expect(headerTitle.textContent).toBe('Explorar Origem');

    const profileButton = getByTestId(profileButtonTestId);
    expect(profileButton).toBeInTheDocument();
  });

  it('Testa se a pagina de Explorar renderdiza o header corretamente', () => {
    const { getByTestId } = renderWithRouter(<Explorar />);

    const headerTitle = getByTestId(pageTitleTestId);
    expect(headerTitle.textContent).toBe('Explorar');

    const profileButton = getByTestId(profileButtonTestId);
    expect(profileButton).toBeInTheDocument();
  });

  it('Testa se a pagina de Bebidas Detalhes NAO renderdiza o header', () => {
    const { queryByText } = renderWithRouter(<BebidasDetalhes />);

    const headerTitle = queryByText('Bebidas');
    expect(headerTitle).toBe(null);
  });

  it('Testa se a pagina de Comidas Detalhes NAO renderdiza o header', () => {
    const { queryByText } = renderWithRouter(<ComidasDetalhes />);

    const headerTitle = queryByText('Comidas');
    expect(headerTitle).toBe(null);
  });

  it('Testa se a pagina de Bebidas Processo NAO renderdiza o header', () => {
    const { queryByText } = renderWithRouter(<BebidasProcesso />);

    const headerTitle = queryByText('Bebidas');
    expect(headerTitle).toBe(null);
  });

  it('Testa se a pagina de Comidas Processo NAO renderdiza o header', () => {
    const { queryByText } = renderWithRouter(<ComidasProcesso />);

    const headerTitle = queryByText('Comidas');
    expect(headerTitle).toBe(null);
  });
});
