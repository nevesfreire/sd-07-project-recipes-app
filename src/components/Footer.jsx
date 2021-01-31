import React from 'react';
import { Link } from 'react-router-dom';
import { titleHeaderNames, useTitleContext } from '../context/TitleContext';

import drink from '../images/drinkIcon.svg';
import explorer from '../images/exploreIcon.svg';
import food from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const { setHeaderName } = useTitleContext();

  return (
    <nav className="container-nav" data-testid="footer">
      <Link to="/bebidas" onClick={ () => setHeaderName(titleHeaderNames.bebidas) }>
        <img
          data-testid="drinks-bottom-btn"
          src={ drink }
          alt="Bebidas"
        />
      </Link>
      <Link to="/explorar" onClick={ () => setHeaderName(titleHeaderNames.explorar) }>
        <img
          data-testid="explore-bottom-btn"
          src={ explorer }
          alt="Explorar"
        />
      </Link>
      <Link to="/comidas" onClick={ () => setHeaderName(titleHeaderNames.comidas) }>
        <img
          data-testid="food-bottom-btn"
          src={ food }
          alt="Comidas"
        />
      </Link>
    </nav>
  );
}

export default Footer;
