import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Header', () => {
  it('exists on the screen', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
  });
});
