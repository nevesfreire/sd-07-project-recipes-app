import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './style.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer" data-testid="footer">
        <Link to="/bebidas">
          <button
            type="button"
            data-testid="drinks-bottom-btn"
          >
            <img
              src={ drinkIcon }
              alt="drinks"
            />
          </button>
        </Link>
        <Link to="/explorar">
          <button
            type="button"
            data-testid="explore-bottom-btn"
          >
            <img
              src={ exploreIcon }
              alt="explore"
            />
          </button>
        </Link>
        <Link to="/comidas">
          <button
            type="button"
            data-testid="food-bottom-btn"
          >
            <img
              src={ mealIcon }
              alt="meal"
            />
          </button>
        </Link>
      </footer>
    );
  }
}

export default Footer;
