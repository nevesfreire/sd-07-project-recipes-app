import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class MealCard extends Component {
  render() {
    const { meals: { strMealThumb, strMeal, idMeal }, index } = this.props;
    return (
      <div>
        <Link to={ `/comidas/${idMeal}` }>
          <div data-testid={ `${index}-recipe-card` }>{ idMeal }</div>
        </Link>
        <img src={ strMealThumb } alt={ strMeal } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
      </div>
    );
  }
}

MealCard.propTypes = {
  meals: PropTypes.shape({
    idMeal: PropTypes.number.isRequired,
    strMealThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default MealCard;
