import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../Tests/renderWithRouter';

import Footer from './index';

describe('Testando o Menu inferior', () => {
  test('19 - Implemente os elementos do menu inferior respeitando os atributos '
    + 'descritos no protótipo', () => {
    renderWithRouter(
      <Footer />,
    );

    const container = screen.getByTestId('footer');
    const iconDrinks = screen.getByTestId('drinks-bottom-btn');
    const iconExplore = screen.getByTestId('explore-bottom-btn');
    const iconFood = screen.getByTestId('food-bottom-btn');

    expect(container).toBeInTheDocument();
    expect(iconDrinks).toBeInTheDocument();
    expect(iconExplore).toBeInTheDocument();
    expect(iconFood).toBeInTheDocument();
  });

  test('20 - Posicione o menu inferior de forma fixa e apresente 3 ícones: um para '
    + 'comidas, um para bebidas e outro para exploração', () => {
    renderWithRouter(
      <Footer />,
    );

    const container = screen.getByTestId('footer');

    // console.log(container.
    // const obj = 'display: flex';
    expect(container).toHaveClass('footer-container');
    expect(container).toHaveStyle('position: fixed');
    // expect(container).toHaveProperty('css', 'position: fixed');

    // const { container } = render(<Footer />);
    // console.log(container.firstElementChild)
    // expect(container.firstChild).toHaveStyle('position: fixed');

    // const { container } = render(<Hello name="Jill" />);
    // expect(container.firstElementChild).toHaveStyle('position: fixed');

    // const iconDrinks = screen.getByTestId('drinks-bottom-btn');
    // const iconExplore = screen.getByTestId('explore-bottom-btn');
    // const iconFood = screen.getByTestId('food-bottom-btn');

    //   const MyHeaderRoots = document.getElementsByClassName('footer-container')
    // const style = screen.getComputedStyle(MyHeaderRoots[0])
    // expect(style.position).toBe('fixed')
    // expect(style.top).toBe('0px')

    // expect(container).toHaveStyle({
    //   backgroundColor: '#C4C4C4',
    //   bottom: '0',
    //   boxSizing: 'border-box',
    //   display: 'flex',
    //   justifyContent: 'space-between',
    //   padding: '10px',
    //   position: 'fixed',
    //   width: '100vw',
    // });

    // expect(getByTestId('background')).toHaveStyle(`background-image: url(${props.image})`)

    // expect(iconDrinks.nodeName).toBe('IMG');
    // expect(iconExplore.nodeName).toBe('IMG');
    // expect(iconFood.nodeName).toBe('IMG');

    // expect(iconDrinks.src).toBe('http://localhost/drinkIcon.svg');
    // expect(iconExplore.src).toBe('http://localhost/exploreIcon.svg');
    // expect(iconFood.src).toBe('http://localhost/mealIcon.svg');
  });
});
