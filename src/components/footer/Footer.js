import React from 'react';
import { useHistory } from 'react-router-dom';
import FoodImage from '../../images/mealIcon.svg';
import DrinkImage from '../../images/drinkIcon.svg';
import ExploreImage from '../../images/exploreIcon.svg';
// import Mais from '../../images/mais.png';

function Footer() {
  const history = useHistory();
  function redirectComidas() {
    history.push('/comidas');
  }

  function redirectBebidas() {
    history.push('/bebidas');
  }

  function redirectExplorar() {
    history.push('/explorar');
  }

  return (
    <div data-testid="footer" className="footer">
      <button
        className="ButtonFooter"
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ redirectBebidas }
        src={ DrinkImage }
      >
        <img src={ DrinkImage } alt="drink-img" />
        Bebidas
      </button>
      <button
        className="bottonFooter"
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ redirectExplorar }
        src={ ExploreImage }
      >
        <img src={ ExploreImage } alt="explore-img" />
        Explorar
      </button>
      <button
        className="buttonFooter"
        type="button"
        data-testid="food-bottom-btn"
        onClick={ redirectComidas }
        src={ FoodImage }
      >
        <img src={ FoodImage } alt="food-img" />
        Comidas
      </button>
    </div>
  );
}

export default Footer;
