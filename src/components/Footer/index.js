import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './style.css';

function Footer() {
  return (
    <div className="footer-container" data-testid="footer">
      <Link to="/bebidas">
        <img
          className="footer-icon-drink"
          src={drinkIcon}
          alt="Ir para a página de bebibas"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          className="footer-icon-explore"
          src={exploreIcon}
          alt="Ir para a página de exploração"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/comidas">
        <img
          className="footer-icon-meal"
          src={mealIcon}
          alt="Ir para a página de comidas"
          data-testid="food-bottom-btn"
        />
      </Link>
    </div>
  );
}

export default Footer;
