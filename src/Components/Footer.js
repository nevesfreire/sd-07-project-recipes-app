import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import explIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <>
    <input type="checkbox" className="check" />
    <ul data-testid="footer" className="footer">
      <li>
        <Link to="/bebidas">
          <button type="button">
            <img
              src={ drinkIcon }
              data-testid="drinks-bottom-btn"
              alt="SVG Drink Icon"
            />
          </button>
        </Link>
      </li>
      <li>
        <Link to="/explorar">
          <button type="button">
            <img
              src={ explIcon }
              data-testid="explore-bottom-btn"
              alt="SVG explore Icon"
            />
          </button>
        </Link>
      </li>
      <li>
        <Link to="/comidas">
          <button type="button">
            <img src={ mealIcon } data-testid="food-bottom-btn" alt="SVG meal Icon" />
          </button>
        </Link>
      </li>
    </ul>
  </>
);

export default Footer;
