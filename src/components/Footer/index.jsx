import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

const Footer = () => (
  <footer data-testid="footer">
    <Link to="/bebidas" data-testid="drinks-bottom-btn">
      <img src={ drinkIcon } alt="drink icon" />
    </Link>
    <Link to="/explorar" data-testid="explore-bottom-btn">
      <img src={ exploreIcon } alt="drink icon" />
    </Link>
    <Link to="/comidas" data-testid="food-bottom-btn">
      <img src={ mealIcon } alt="drink icon" />
    </Link>
  </footer>
);

export default Footer;
