import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div data-testid="footer">
      <Link to="/bebidas">
        <button type="button">
          <img
            src={ drinkIcon }
            alt="icone bebidas"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button">
          <img
            src={ exploreIcon }
            alt="icone explorar"
            data-testid="explore-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button">
          <img
            src={ mealIcon }
            alt="icone comidas"
            data-testid="food-bottom-btn"
          />
        </button>
      </Link>
    </div>
  );
}

export default Footer;
