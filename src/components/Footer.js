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
        <img
          src={ drinkIcon }
          alt="drinkIcon"
          data-testid="drinks-bottom-btn"
          onClick={ () => history.push('/bebidas') }
        />
        <img
          src={ exploreIcon }
          alt="exploreIcon"
          data-testid="explore-bottom-btn"
          onClick={ () => history.push('/explorar') }
        />
        <img
          src={ mealIcon }
          alt="mealIcon" data-testid="food-bottom-btn"
          onClick={ () => history.push('/comidas') }
        />
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
