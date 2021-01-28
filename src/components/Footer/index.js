import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

import DrinkIcon from '../../images/drinkIcon.svg';
import SearchIcon from '../../images/exploreIcon.svg';
import FoodIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/bebidas">
        <img
          src={ DrinkIcon }
          alt="drink link"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          src={ SearchIcon }
          alt="search link"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <img
          src={ FoodIcon }
          alt="food link"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
