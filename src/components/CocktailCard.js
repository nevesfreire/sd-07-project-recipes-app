import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CocktailCard extends Component {
  render() {
    const { cocktails: {
      strCocktailThumb,
      strCocktail,
      idCocktail }, index } = this.props;
    return (
      <div>
        <div data-testid={ `${index}-recipe-card` }>{ idCocktail }</div>
        <img
          src={ strCocktailThumb }
          alt={ strCocktail }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{ strCocktail }</p>
      </div>
    );
  }
}

CocktailCard.propTypes = {
  cocktails: PropTypes.shape({
    idCocktail: PropTypes.number.isRequired,
    strCocktailThumb: PropTypes.string.isRequired,
    strCocktail: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CocktailCard;
