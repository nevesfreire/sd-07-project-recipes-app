import React from 'react';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Teste do App.js', () => {
  it('A pagina de login é renderizada ao carregar a aplicação no path de URL /', () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
