import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

class DoneRecipesCard extends Component {
  render() {
    const { recipe, handleShare, recipeIndex } = this.props;
    const { id, name, image, category, area, tags, doneDate, type } = recipe;
    const mealType = `${area} - ${category}`;
    const isAlcoholic = 'Alcoholic';
    const tagsBottomLimit = 0;
    const tagsUpperLimit = 2;

    return (
      <div key={ recipeIndex }>
        <img
          data-testid={ `${recipeIndex}-horizontal-image` }
          src={ image }
          alt="recipe"
        />
        <h2 data-testid={ `${recipeIndex}-horizontal-name` }>
          { name }
        </h2>
        {type === 'bebida'
          ? <p data-testid={ `${recipeIndex}-horizontal-top-text` }>{ isAlcoholic }</p>
          : <p data-testid={ `${recipeIndex}-horizontal-top-text` }>{ mealType }</p>}
        <span data-testid={ `${recipeIndex}-horizontal-done-date` }>
          <p>Feita em:</p>
          { doneDate }
        </span>
        { tags.slice(tagsBottomLimit, tagsUpperLimit).map((tag, tagIndex) => (
          <span
            key={ tagIndex }
            data-testid={ `${tagsBottomLimit}-${tag}-horizontal-tag` }
          >
            { tag }
          </span>
        ))}
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
      </div>
    );
  }
}

DoneRecipesCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    area: PropTypes.string,
    tags: PropTypes.string,
    doneDate: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
  recipeIndex: PropTypes.number.isRequired,
  handleShare: PropTypes.func.isRequired,
};

export default DoneRecipesCard;
