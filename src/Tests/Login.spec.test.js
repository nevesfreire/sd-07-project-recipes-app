import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import LoginPage from '../Pages/LoginPage';
import App from '../App';

describe('Test with Login Module', () => {
  it('should have a login field', async () => {
    renderWithRouter(<LoginPage />);

    const imgMain = await screen.findByRole('textbox');

    expect(imgMain).toBeInTheDocument();
  });
});
