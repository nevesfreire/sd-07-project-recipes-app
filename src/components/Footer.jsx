import React from 'react';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

export default function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <a href="/comidas">
        <img
          src={ mealIcon }
          alt="comidas"
          data-testid="food-bottom-btn"
        />
      </a>
      <a href="/explorar">
        <img
          src={ exploreIcon }
          alt="explorar"
          data-testid="explore-bottom-btn"
        />
      </a>
      <a href="/bebidas">
        <img
          src={ drinkIcon }
          alt="bebidas"
          data-testid="drinks-bottom-btn"
        />
      </a>
    </div>
  );
}
