import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

class FavoriteRecipesCard extends Component {
  constructor() {
    super();

    this.handleShareFeedback = this.handleShareFeedback.bind(this);

    this.state = {
      sendMessageLinkCopiado: false,
    };
  }

  handleShareFeedback() {
    this.setState({
      sendMessageLinkCopiado: true,
    });
  }

  render() {
    const { recipe, handleShare, deleteFavorite, recipeIndex } = this.props;
    const { sendMessageLinkCopiado } = this.state;
    const { id, name, image, category, area, type } = recipe;
    const mealType = `${area} - ${category}`;
    const isAlcoholic = 'Alcoholic';
    return (
      <div name={ recipeIndex }>
        <Link
          key={ recipe.id }
          to={ `/${recipe.type}s/${recipe.id}` }
        >
          <img
            data-testid={ `${recipeIndex}-horizontal-image` }
            src={ image }
            alt="recipeImage"
          />
          <h2 data-testid={ `${recipeIndex}-horizontal-name` }>
            { name }
          </h2>
        </Link>
        {type === 'bebida'
          ? <p data-testid={ `${recipeIndex}-horizontal-top-text` }>{ isAlcoholic }</p>
          : <p data-testid={ `${recipeIndex}-horizontal-top-text` }>{ mealType }</p>}
        <button
          type="button"
          name={ id }
          onClick={ () => {
            handleShare(type, id);
            this.handleShareFeedback();
          } }
        >
          <img
            data-testid={ `${recipeIndex}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share button"
          />
        </button>
        {sendMessageLinkCopiado === true
          ? <p>Link copiado!</p>
          : ''}
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
