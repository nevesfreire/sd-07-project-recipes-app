import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

export default function Footer() {
  return (
    <footer data-testid="footer" className="footer" style={ { position: 'fixed' } }>
      <div>
        <Link to="/bebidas">
          <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
        </Link>
      </div>
      <div>
        <Link to="/explorar">
          <img src={ exploreIcon } alt="Explore" data-testid="explore-bottom-btn" />
        </Link>
      </div>
      <div>
        <Link to="/comidas">
          <img src={ mealIcon } alt="Meals" data-testid="food-bottom-btn" />
        </Link>
      </div>
    </footer>
  );
}
