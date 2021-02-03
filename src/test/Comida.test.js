import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Comidas from '../pages/comidas';

describe('Comidas test', () => {
  it('Botões na categoria comidas', async () => {
    const{ findByText, getByText } = renderWithRouter(<Comidas />);

    await findByText('Beef');

    expect(getByText('Goat')).toBeInTheDocument();

    const Allbtn = getByText('All');

    fireEvent.click(Allbtn);

    await findByText('Kumpir');

    const ChickenBtb = getByText('Chicken');

    fireEvent.click(ChickenBtb);

    await findByText('Brown Stew Chicken');
    });
});
