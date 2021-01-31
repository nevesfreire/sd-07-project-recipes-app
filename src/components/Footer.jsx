import React from 'react';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import './style/Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container" data-testid="footer">
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
    </footer>
  );
}
