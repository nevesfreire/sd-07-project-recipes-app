import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
// import fireEvent from '@testing-library/user-event';
import Header from '../components/Header';

describe('Testa se HEADER é renerizada:', () => {
  test.only('Verifica icone PERFIL', () => {
    const { getByRole } = renderWithRouter(<Header />);

    const PERFILBTN = getByRole('button', { name: /profile-icon/i });
    const PERFILICON = getByRole('img', { name: /profile-icon/i });
    expect(PERFILBTN).toBeInTheDocument();
    expect(PERFILICON).toBeInTheDocument();
  });
  test('Verifica TÍTULO', () => {
    const { getByRole } = renderWithRouter(<Header />);

    const PAGETITLE = getByRole('heading', { name: /comidas/i });
    expect(PAGETITLE).toBeInTheDocument();
  });
  test('Verifica icone SEARCH:', () => {
    const { getByRole } = renderWithRouter(<Header />);

    const SEARCHBTN = getByRole('button', { name: /search-icon/i });
    const SEARCHICON = getByRole('img', { name: /search-icon/i });
    expect(SEARCHBTN).toBeInTheDocument();
    expect(SEARCHICON).toBeInTheDocument();
  });
});
