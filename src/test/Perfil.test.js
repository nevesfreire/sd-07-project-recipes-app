import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Perfil from '../pages/Perfil';

describe('Comidas test', () => {
  it('tem o header', () => {
    const { getByTestId } = renderWithRouter(<Perfil />);

    expect(getByTestId('header')).toBeInTheDocument();
  });

  it('tem o footer', () => {
    const { getByTestId } = renderWithRouter(<Perfil />);

    expect(getByTestId('footer')).toBeInTheDocument();
  });

  it('', async () => {
    const { getByTestId, history } = renderWithRouter(<Perfil />);

    fireEvent.click(getByText('Receitas Feitas'));

    expect(history.location.pathname).toEqual('/receitas-feitas');
  });

  it('', async () => {
    const { getByText, history } = renderWithRouter(<Perfil />);

    fireEvent.click(getByText('Receitas Favoritas'));

    expect(history.location.pathname).toEqual('/receitas-favoritas');
  });

  it('', async () => {
    const { getByText, history } = renderWithRouter(<Perfil />);

    fireEvent.click(getByText('Sair'));

    expect(history.location.pathname).toEqual('/');
  });
});
