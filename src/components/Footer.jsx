import React from 'react';
import { Link } from 'react-router-dom';

import drink from '../images/drinkIcon.svg';
import explorer from '../images/exploreIcon.svg';
import food from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <nav className="container-nav" data-testid="footer">
      <Link to="/bebidas">
        <img
          data-testid="drinks-bottom-btn"
          src={ drink }
          alt="Bebidas"
        />
      </Link>
      <Link to="/explorar">
        <img
          data-testid="explore-bottom-btn"
          src={ explorer }
          alt="Explorar"
        />
      </Link>
      <Link to="/comidas">
        <img
          data-testid="food-bottom-btn"
          src={ food }
          alt="Comidas"
        />
      </Link>
    </nav>
  );
}

export default Footer;
