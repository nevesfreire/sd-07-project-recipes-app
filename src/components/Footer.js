import React, { Component } from 'react';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/footer.css';

class Footer extends Component {
  render() {
    const { history } = this.props;
    return (
      <footer className="footer-container" data-testid="footer">
        <button
          type="button"
          onClick={ () => history.push('/bebidas') }
        >
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drinkIcon"
          />
        </button>
        <button
          type="button"
          onClick={ () => history.push('/explorar') }
        >
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="exploreIcon"
          />
        </button>
        <button
          type="button"
          onClick={ () => history.push('/comidas') }
        >
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="mealIcon"
          />
        </button>
      </footer>
    );
  }
}

export default Footer;

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
