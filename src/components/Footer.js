import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  return (
    <div data-testid="footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn">
        <img
          alt=""
          src={ drinkIcon }
        />
      </Link>
      <Link to="/drinks" data-testid="explore-bottom-btn">
        <img
          alt=""
          src={ exploreIcon }
        />
      </Link>
      <Link to="/drinks" data-testid="food-bottom-btn">
        <img
          alt=""
          src={ mealIcon }
        />
      </Link>
    </div>
  );
}
