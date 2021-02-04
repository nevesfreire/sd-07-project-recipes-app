import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import '../css/footer.css';

function Footer() {
  const history = useHistory();

  const callDrinks = () => (history.push('/bebidas'));
  const callExplore = () => (history.push('/explorar'));
  const callFood = () => (history.push('/comidas'));

  return (
    <footer data-testid="footer" className="footer footer-container">
      <Button onClick={ callDrinks } className="footer-buttons">
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink" />
      </Button>
      <Button onClick={ callExplore } className="footer-buttons">
        <img data-testid="explore-bottom-btn" src={ exploreIcon } alt="explore" />
      </Button>
      <Button onClick={ callFood } className="footer-buttons">
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="food" />
      </Button>
    </footer>
  );
}

export default Footer;
