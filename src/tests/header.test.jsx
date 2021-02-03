import React from 'react';
// import fireEvent from '@testing-library/user-event';
import Header from '../components/Header';

describe('Testa Header é renerizada página de  do App de receirtas:', () => {
  test('Verifica icone Perfil', () => {
    const { getByRole } = renderWithRouter(<Header />);
    getByRole('button', { name: /profile-icon/i });
    getByRole('img', { name: /profile-icon/i });
  });
  test('Verifica título', () => {
    const { getByRole } = renderWithRouter(<Header />);
    getByRole('heading', { name: /comidas/i });
  });
  test('Verifica icone Search:', () => {
    const { getByRole } = renderWithRouter(<Header />);
    getByRole('button', { name: /search-icon/i });
    getByRole('img', { name: /search-icon/i });
  });
});
