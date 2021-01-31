import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './components.css';
import Button from './Button';

function Footer() {
  const { push } = useHistory();
  return (
    <div data-testid="footer" className="footer ">
      <Button
        testid="drinks-bottom-btn"
        icon={ drinkIcon }
        func={ () => { push('/bebidas'); } }
      />
      <Button
        testid="explore-bottom-btn"
        icon={ exploreIcon }
        func={ () => { push('/explorar'); } }
      />
      <Button
        testid="food-bottom-btn"
        icon={ mealIcon }
        func={ () => { push('/comidas'); } }
      />
    </div>
  );
}

export default Footer;
