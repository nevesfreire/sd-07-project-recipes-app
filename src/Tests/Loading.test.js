import React from 'react';

import renderWithRouter from './renderWithRouter';
import Loading from '../components/Loading';

describe('Loading', () => {
  it('Loading', () => {
    const { getByText } = renderWithRouter(<Loading />);
    const allCat = getByText('Carregando...');

    expect(allCat).toBeInTheDocument();
  });
});
