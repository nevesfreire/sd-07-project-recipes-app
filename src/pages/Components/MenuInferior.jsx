import React from 'react';
import { Link } from 'react-router-dom';
import FoodImage from '../../images/mealIcon.svg';
import DrinkImage from '../../images/drinkIcon.svg';
import ExploreImage from '../../images/exploreIcon.svg';
import './MenuInferior.Css';

function MenuInferior() {
  return (
    <div data-testid="footer" className="MenuInferior">
      <Link to="/comidas">
        <button
          src={ FoodImage }
          type="button"
          data-testid="food-bottom-btn"
        >
          <img src={ FoodImage } alt="food-img" />
          Comidas
        </button>
      </Link>
      <Link to="/bebidas">
        <button
          src={ DrinkImage }
          type="button"
          data-testid="drinks-bottom-btn"
        >
          <img src={ DrinkImage } alt="drink-img" />
          Bebidas
        </button>
      </Link>
      <Link to="/explorar">
        <button
          src={ ExploreImage }
          type="button"
          data-testid="explore-bottom-btn"
        >
          <img src={ ExploreImage } alt="explore-img" />
          Explorar
        </button>
      </Link>
    </div>
  );
}
export default MenuInferior;
