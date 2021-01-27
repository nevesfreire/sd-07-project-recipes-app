import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './footer.css';

function Footer() {
  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          className="drinkIcon"
          alt="explorar drinks"
        />
      </Link>
      <Link to="/explorar">
        <img
          src={ exploreIcon }
          data-testid="explore-bottom-btn"
          className="exploreIcon"
          alt="explorar"
        />
      </Link>
      <Link to="/comidas">
        <img
          src={ mealIcon }
          data-testid="food-bottom-btn"
          className="mealIcon"
          alt="explorar comidas"
        />
      </Link>
    </footer>
  );
}

export default Footer;
