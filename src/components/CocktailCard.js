import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/recipes.css';

class CocktailCard extends Component {
  render() {
    const { cocktail: {
      strDrinkThumb,
      strDrink,
      idDrink }, index, testid } = this.props;
    return (
      <div>
        <div data-testid={ `${index}-${testid}` }>{ idDrink }</div>
        <img
          src={ strDrinkThumb }
          alt={ strDrink }
          data-testid={ `${index}-card-img` }
          className="recipe-photo"
        />
        <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
      </div>
    );
  }
}

CocktailCard.propTypes = {
  cocktail: PropTypes.shape({
    idDrink: PropTypes.number.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};

export default CocktailCard;
