import React from 'react';
import { Link } from 'react-router-dom';
import { drinkIcon, exploreIcon, mealIcon } from '../../images';

function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <Link to="/bebidas">
        <button
          src={ drinkIcon }
          type="button"
          data-testid="drinks-bottom-btn"
        >
          <img
            src={ drinkIcon }
            alt="drink icon"
          />
        </button>
      </Link>
      <Link to="/explorar">
        <button
          type="button"
          src={ exploreIcon }
          data-testid="explore-bottom-btn"
        >
          <img
            src={ exploreIcon }
            alt="explore icon"
            className="image"
          />
        </button>
      </Link>
      <Link to="/comidas">
        <button
          src={ mealIcon }
          type="button"
          data-testid="food-bottom-btn"
        >
          <img
            src={ mealIcon }
            alt="meal icon"
            className="image"
          />
        </button>
      </Link>
    </div>
  );
}

export default Footer;
