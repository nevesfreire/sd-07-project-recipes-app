import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/footer.css';

function Footer() {
  const history = useHistory();

  function handleClickDrinks() {
    history.push('/bebidas');
  }

  function handleClickExplore() {
    history.push('/explorar');
  }

  function handleClickMeals() {
    history.push('/comidas');
  }

  return (
    <div className="footer" data-testid="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ handleClickDrinks }
        src={ drinkIcon }
      >
        <img className="rocksGlass" src={ drinkIcon } alt="drink" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ handleClickExplore }
        src={ exploreIcon }
      >
        <img className="rocksGlass" src={ exploreIcon } alt="explore" />
      </button>
      <button
        type="submit"
        data-testid="food-bottom-btn"
        onClick={ handleClickMeals }
        src={ mealIcon }
      >
        <img className="rocksGlass" src={ mealIcon } alt="meal" />
      </button>
    </div>
  );
}

export default Footer;
