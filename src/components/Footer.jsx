import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';

class Footer extends React.Component {
  render() {
    return (
      <div data-testid="footer" className="footer" style={ { padding: '10px' } }>
        <Link to="/comidas">
          <img
            src={ mealIcon }
            alt="Foto Perfil"
            data-testid="food-bottom-btn"
            className="footer-img"
          />
        </Link>
        <Link to="/explorar">
          <img
            src={ exploreIcon }
            alt="Foto Perfil"
            data-testid="explore-bottom-btn"
            className="footer-img"
          />
        </Link>
        <Link to="/bebidas">
          <img
            src={ drinkIcon }
            alt="Foto Perfil"
            data-testid="drinks-bottom-btn"
            className="footer-img"
          />
        </Link>
      </div>
    );
  }
}

export default Footer;
