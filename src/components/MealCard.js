import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/recipes.css';

class MealCard extends Component {
  render() {
    const { meals: { strMealThumb, strMeal, idMeal }, index, testid } = this.props;
    return (
      <div>
        <div data-testid={ `${index}-${testid}` }>{ idMeal }</div>
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid={ `${index}-card-img` }
          className="recipe-photo"
        />
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
  testid: PropTypes.string.isRequired,
};

export default MealCard;
