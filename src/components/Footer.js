import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <button type="button">
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="Ícone de bebida" />
      </button>
      <button type="button">
        <img src={ exploreIcon } data-testid="explore-bottom-btn" alt="Ícone explorar" />
      </button>
      <button type="button">
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="Ícone de comida" />
      </button>
    </div>
  );
}

export default Footer;
