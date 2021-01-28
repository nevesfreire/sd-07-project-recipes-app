import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './components.css';

function Footer() {
  return (
    <div data-testid="footer" className="footer">
      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          alt="icone bebidas"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="icone explorar"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <img
          src={ mealIcon }
          alt="icone comidas"
          data-testid="food-bottom-btn"
        />
      </Link>
    </div>
  );
}

export default Footer;
