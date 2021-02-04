import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IngredientCard extends Component {
  render() {
    const { ingredients: { idIngredient, strIngredient }, index } = this.props;
    return (
      <div>
        <div data-testid={ `${index}-ingredient-card` }>{ idIngredient }</div>
        <img src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` } alt={ strIngredient } data-testid={ `${index}-card-img` } />
        <p data-testid={ `${index}-card-name` }>{ strIngredient }</p>
      </div>
    );
  }
}

IngredientCard.propTypes = {
  ingredients: PropTypes.shape({
    idIngredient: PropTypes.number.isRequired,
    strIngredient: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default IngredientCard;
