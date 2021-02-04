import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteRecipeCard extends Component {
  render() {
    const { favoriteRecipes: {
      type,
      area,
      category,
      alcoholicOrNot,
      name,
      image,
    }, index } = this.props;

    return (
      <div data-testid={ `${index}-recipe-card` }>
        <img src={ image } alt={ name } data-testid={ `${index}-horizontal-image` } />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        {type === 'bebida' ? <p>{ alcoholicOrNot}</p>
          : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${area} - ${category}`}
            </p>
          ) }
        <img
          src={ blackHeartIcon }
          data-testid={ `${index}-horizontal-favorite-btn` }
          alt="Favoritar/Desfavoritar"
        />
        <img
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt="Compartilhar receita"
        />
      </div>
    );
  }
}

FavoriteRecipeCard.propTypes = {
  favoriteRecipes: PropTypes.shape({
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteRecipeCard;
