import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div data-testid="footer">
      <button type="button" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="Ícone de bebida" />
      </button>
      <button type="button" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="Ícone de explorar" />
      </button>
      <button type="button" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="Ícone de comida" />
      </button>
    </div>
  );
}

export default Footer;
