import React from 'react';
import { Link } from 'react-router-dom';
import drikIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

const Footer = () => (
  <div data-testid="footer" className="footer">
    <Link to="/bebidas">
      <img src={ drikIcon } alt="Encontre bebidas" data-testid="drinks-bottom-btn" />
    </Link>
    <Link to="/explorar">
      <img src={ exploreIcon } alt="Explore receitas" data-testid="explore-bottom-btn" />
    </Link>
    <Link to="/comidas">
      <img
        src={ mealIcon }
        alt="Encontre pratos específicos"
        data-testid="food-bottom-btn"
      />
    </Link>
  </div>
);

export default Footer;
