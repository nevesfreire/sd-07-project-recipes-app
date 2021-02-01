import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MealCard extends Component {
  render() {
    const { meals: { idMeal, strMealThumb, strMeal } } = this.props;
    return (
      <div>
        <img src={ strMealThumb } alt={ strMeal } />
        <p data-testid={ `${idMeal}-recomendation-card` }>{ strMeal }</p>
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
};

export default MealCard;
