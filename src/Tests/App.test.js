import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste do APP', () => {
  it('Cheque se path / é default', () => {
    const { getByText, history } = renderWithRouter(<App />);
    expect(getByText('Email:'));
    history.push('/comidas');
    getByText('comidas');
  });
});
