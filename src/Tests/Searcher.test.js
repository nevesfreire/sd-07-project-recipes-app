import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Searcher from '../Components/Searcher';

describe('Test with Login Module', () => {
  beforeEach(() => {
    renderWithRouter(<Searcher />);
  });

  it('should have input are', async () => {
    const checkInput = screen.getByText(/primeira letra/i);
    const textInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-input');

    fireEvent.change(textInput, { target: { value: 's' } });
    fireEvent.click(searchButton);

    expect(checkInput).toBeInTheDocument();
  });
});
