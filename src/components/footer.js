import React, { Component } from 'react';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../App.css';

class Footer extends Component {
  render() {
    const { history } = this.props;
    return (
      <footer data-testid="footer" className="footer">

        <input
          type="image"
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Icone Drink"
          onClick={ () => history.push('/bebidas') }
        />

        <input
          type="image"
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="Icone Explorar"
          onClick={ () => history.push('/explorar') }
        />

        <input
          type="image"
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Icone Comida"
          onClick={ () => history.push('/comidas') }
        />

      </footer>
    );
  }
}

Footer.propTypes = {
  history: PropTypes.objectOf({ push: PropTypes.func.isRequired }).isRequired,
};

export default Footer;
