import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteRecipesCard extends Component {
  render() {
    const { recipe, handleShare, deleteFavorite, recipeIndex } = this.props;
    const { id, name, image, category, area, type } = recipe;
    const mealType = `${area} - ${category}`;
    const isAlcoholic = 'Alcoholic';
    return (
      <div name={ recipeIndex }>
        <img
          data-testid={ `${recipeIndex}-horizontal-image` }
          src={ image }
          alt="recipeImage"
        />
        <h2 data-testid={ `${recipeIndex}-horizontal-name` }>
          { name }
        </h2>
        {type === 'bebida'
          ? <p data-testid={ `${recipeIndex}-horizontal-top-text` }>{ isAlcoholic }</p>
          : <p data-testid={ `${recipeIndex}-horizontal-top-text` }>{ mealType }</p>}
        <button
          type="button"
          name={ id }
          onClick={ () => handleShare(type, id) }
        >
          <img
            data-testid={ `${recipeIndex}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share button"
          />
        </button>
        <button
          type="button"
          name={ id }
          onClick={ () => deleteFavorite(id) }
        >
          <img
            src={ blackHeartIcon }
            data-testid={ `${recipeIndex}-horizontal-favorite-btn` }
            alt="favorite button"
          />
        </button>
      </div>
    );
  }
}

FavoriteRecipesCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    area: PropTypes.string,
    type: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  recipeIndex: PropTypes.number.isRequired,
  handleShare: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
};

export default FavoriteRecipesCard;
