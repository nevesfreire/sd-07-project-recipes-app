import React from 'react';
import { useHistory } from 'react-router-dom';
import { drinkIcon, exploreIcon, mealIcon } from '../../images';

import './style.css';

export default function Footer() {
  const history = useHistory();
  return (
    <div data-testid="footer" className="footer-container">
      <div className="footer-context">
        <button
          type="button"
          onClick={ () => history.push('/bebidas') }
        >
          <img
            className="footer-img"
            data-testid="drinks-bottom-btn"
            alt="Icone de bebidas"
            src={ drinkIcon }
          />
        </button>
        <button
          type="button"
          onClick={ () => history.push('/explorar') }
        >
          <img
            data-testid="explore-bottom-btn"
            alt="Icone de explorar"
            src={ exploreIcon }
          />
        </button>
        <button
          type="button"
          onClick={ () => history.push('/comidas') }
        >
          <img
            data-testid="food-bottom-btn"
            alt="Icone de comida"
            src={ mealIcon }
          />
        </button>
      </div>
    </div>
  );
}
