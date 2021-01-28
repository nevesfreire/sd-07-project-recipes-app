import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <footer data-testid="footer">
    <Link to="/bedidas">
      <button
        type="button"
      >
        <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="SVG Drink Icon" />
      </button>
    </Link>
    <Link to="/explorar">
      <button
        type="button"
      >
        <img src={ exploreIcon } data-testid="explore-bottom-btn" alt="SVG explore Icon" />
      </button>
    </Link>
    <Link to="/comidas">
      <button
        type="button"
      >
        <img src={ mealIcon } data-testid="food-bottom-btn" alt="SVG meal Icon" />
      </button>
    </Link>
  </footer>
);

export default Footer;
