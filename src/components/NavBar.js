import React, { Component } from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import NavBarStyle from '../styles/NavBarStyle.css';

class NavBar extends Component {
  render() {
    return (
      <div data-testid="footer" className="navBarContainer">
        <button
          type="button"
          data-testid="drinks-bottom-btn"
          className="navBarButton"
        >
          <img src={ drinkIcon } alt="Menu de bebidas" />
        </button>
        <button
          type="button"
          data-testid="explore-bottom-btn"
          className="navBarButton"
        >
          <img src={ exploreIcon } alt="Menu de exploração" />
        </button>
        <button
          type="button"
          data-testid="food-bottom-btn"
          className="navBarButton"
        >
          <img src={ mealIcon } alt="Menu de comidas" />
        </button>
      </div>
    );
  }
}

export default NavBar;
