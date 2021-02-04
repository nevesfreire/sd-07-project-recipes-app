import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { useHistory } from 'react-router-dom';

function Footer() {

  const history = useHistory();

  return (
    <section className="footer" data-testid="footer">
      <a data-testid="drinks-bottom-btn" href="/bebidas" src={ drinkIcon }>
        <img src={ drinkIcon } alt="drink icon" />
      </a>
      <button data-testid="explore-bottom-btn" onClick = {() => history.push('/explorar')}>
        <img src={ exploreIcon } alt="explore icon" />
      </button>
      <a data-testid="food-bottom-btn" href="/comidas" src={ mealIcon }>
        <img src={ mealIcon } alt="food icon" />
      </a>
    </section>
  );
}

export default Footer;
