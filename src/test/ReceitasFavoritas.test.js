import React from 'react';
import { cleanup, render } from '@testing-library/react';
import ReceitasFavoritas from '../pages/receitas/ReceitasFavoritas';

afterEach(cleanup);

describe('Testando arquivo ReceitasFavoritas.js', () => {
  test('', () => {
    const { getByTestId, getByRole } = render(<ReceitasFavoritas />);

    const profileBtn = getByTestId('profile-top-btn');
    const profileimgSrc = 'http://localhost/profileIcon.svg';
    const pageTitle = getByTestId('page-title');
    expect(profileBtn).toBeInTheDocument();
    expect(getByRole('img').src).toBe(profileimgSrc);
    expect(pageTitle).toHaveTextContent('Receitas Favoritas');
  });
});
