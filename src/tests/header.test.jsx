import React from 'react';
// import fireEvent from '@testing-library/user-event';
import Header from '../components/Header';

describe('Testa Header é renerizada página de  do App de receirtas:', () => {
  test('Verifica icone Perfil', () => {
    const { getByRole } = renderWithRouter(<Header />);

    const PERFILBTN = getByRole('button', { name: /profile-icon/i });
    const PERFILICON = getByRole('img', { name: /profile-icon/i });
    expect(PERFILBTN).toBeInTheDocument();
    expect(PERFILICON).toBeInTheDocument();
  });
  test('Verifica título', () => {
    const { getByRole } = renderWithRouter(<Header />);

    const PAGETITLE = getByRole('heading', { name: /comidas/i });
    expect(PAGETITLE).toBeInTheDocument();
  });
  test('Verifica icone Search:', () => {
    const { getByRole } = renderWithRouter(<Header />);

    const SEARCHBTN = getByRole('button', { name: /search-icon/i });
    const SEARCHICON = getByRole('img', { name: /search-icon/i });
    expect(SEARCHBTN).toBeInTheDocument();
    expect(SEARCHICON).toBeInTheDocument();
  });
});
