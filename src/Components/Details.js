import React from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const Details = ({ type, recipe, recommend, ingredientes }) => {
  const img = type === 'Comidas' ? 'strMealThumb' : 'strDrinkThumb';
  const title = type === 'Comidas' ? 'strMeal' : 'strDrink';
  const rcmdImg = type === 'Comidas' ? 'strDrinkThumb' : 'strMealThumb';
  const rcmdTitle = type === 'Comidas' ? 'strDrink' : 'strMeal';
  console.log(recipe);
  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipe[img] }
        alt="Thumb Food"
        width="400"
      />
      <h2 data-testid="recipe-title">{recipe[title]}</h2>
      <button type="button">
        <img src={ ShareIcon } data-testid="share-btn" alt="thumbShare" />
      </button>
      <button type="button">
        <img src={ whiteHeartIcon } data-testid="favorite-btn" alt="thumbFavorite" />
      </button>
      <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
      {ingredientes.map((ingrediente, index) => (
        <p key={ ingrediente } data-testid={ `${index}-ingredient-name-and-measure` }>
          {ingrediente}
        </p>))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {type === 'Comidas' && <iframe
        data-testid="video"
        title="recipe"
        width="560"
        height="315"
        src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
        frameBorder="0"
        allowFullScreen
      />}
      { recommend.map((card, index) => (
        <div key={ card[rcmdTitle] } data-testid={ `${index}-recomendation-card` }>
          <img src={ card[rcmdImg] } alt="Recommended thumb meal" width="70" />
          <p data-testid={ `${index}-recomendation-title` }>{ card[rcmdTitle] }</p>
        </div>
      ))}
      <button
        data-testid="start-recipe-btn"
        type="button"
        style={ { display: 'none' } }
      >
        comecar receita

      </button>
    </div>);
};

export default Details;

Details.propTypes = {
  recipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strMeal: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
  recommend: PropTypes.arrayOf(PropTypes.object).isRequired,
  ingredientes: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
};
