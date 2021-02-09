import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import explIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => {
  const [lateralBar, setLateralBar] = useState(false);

  return (
    <div className={ lateralBar ? 'footer-over' : 'footer' }>
      <div className="buttons-menu">
        <div className="slide-menu">
          <button
            type="button"
            onClick={ () => setLateralBar(!lateralBar) }
          >
            <div className="dots">
              <span className="dot">•</span>
              <span className="dot">•</span>
              <span className="dot">•</span>
            </div>
          </button>
        </div>
        <div className="menu-option">
          <button type="button">
            <Link to="/bebidas">
              <img
                src={ drinkIcon }
                data-testid="drinks-bottom-btn"
                alt="SVG Drink Icon"
              />
            </Link>
          </button>
          bebidas
        </div>
        <div className="menu-option">
          <button type="button">
            <Link to="/comidas">
              <img src={ mealIcon } data-testid="food-bottom-btn" alt="SVG meal Icon" />
            </Link>
          </button>
          comidas
        </div>
        <div className="menu-option">
          <button type="button">
            <Link to="/explorar">
              <img
                src={ explIcon }
                data-testid="explore-bottom-btn"
                alt="SVG explore Icon"
              />
            </Link>
          </button>
          explorar
        </div>
      </div>
    </div>
  );
};

export default Footer;
