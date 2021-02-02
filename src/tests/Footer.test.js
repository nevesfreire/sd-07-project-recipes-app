import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('19 - Implemente os elementos do menu inferior respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids footer, drinks-bottom-btn, explore-bottom-btn e food-bottom-btn', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('login-submit-btn');

    localStorage.clear();

    fireEvent.change(emailInput, { target: { value: 'email@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(submitButton);

    // const footer = getByTestId('footer');
    // const btnDrinks = getByTestId('drinks-bottom-btn');
    // const btnExplore = getByTestId('explore-bottom-btn');
    // const btnFood = getByTestId('food-bottom-btn');
  });
});