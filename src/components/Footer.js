import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  const handleDrink = () => {
    history.push('/bebidas');
  };

  const handleExplore = () => {
    history.push('/explorar');
  };

  const handleMeal = () => {
    history.push('/comidas');
  };

  return (
    <footer className="footer" data-testid="footer">

      <button
        type="button"
        onClick={ handleDrink }
      >
        <img
          src={ drinkIcon }
          alt="drink-icon"
          data-testid="drinks-bottom-btn"
        />
      </button>

      <button
        type="button"
        onClick={ handleExplore }
      >
        <img
          src={ exploreIcon }
          alt="explore-icon"
          data-testid="explore-bottom-btn"
        />
      </button>

      <button
        type="button"
        onClick={ handleMeal }
      >
        <img
          src={ mealIcon }
          alt="meal-icon"
          data-testid="food-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
