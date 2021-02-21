import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderWitRouter from '../components/renderWithRouter';
import App from '../App';
import Login from '../pages/Login';

describe('test all login functionalityes.', () => {
  it('should test the home path', () => {
    const { getByRole } = renderWitRouter(<Login />);
    const btn = getByRole(/App de Receitas/i);
    expect(btn).toBeInTheDocument();
  });
});
