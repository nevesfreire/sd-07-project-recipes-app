import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import YouTube from 'react-youtube';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';

import Context from '../../Context';
import Recommendation from '../Recommendation';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const getYouTubeVideoId = (url) => {
  if (!url) return 'MAiyzmLhIEw';

  const start = url.split('').findIndex((char) => char === '=');
  const videoId = url.slice(start + 1);

  return videoId;
};

const Recipe = ({ recipe, commonProps }) => {
  const navigate = useHistory();
  const { handleClickStartRecipe, handleClickFavorite } = useContext(Context);

  const [copied, setCopied] = useState(false);

  const handleClickShare = () => {
    copy(window.location.href)
      .then(() => setCopied(true))
      .catch((err) => console.log(err));
  };

  const {
    page, favorite, ingredients, measures, inProgress, meals, drinks, id,
  } = commonProps;

  if (page === 'meal') {
    const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = recipe;

    return (
      <div>
        <img src={ strMealThumb } width="150" alt="meal" data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h3 data-testid="recipe-category">{strCategory}</h3>

        <div>
          <button type="button" data-testid="share-btn" onClick={ handleClickShare }>
            <img src={ shareIcon } alt="share icon" />
          </button>

          <button
            type="button"
            onClick={ () => handleClickFavorite(recipe, page) }
          >
            <img
              src={ favorite ? blackHeartIcon : whiteHeartIcon }
              alt="favorite icon"
              data-testid="favorite-btn"
            />
          </button>
        </div>
        { copied && 'Link copiado!'}

        <h2>Ingredients</h2>
        <div>
          {
            ingredients.map((ing, index) => (
              <p
                key={ `${ing}-${index}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`-${ing} - ${measures[index]}`}
              </p>
            ))
          }
        </div>

        <h2>Instructions</h2>
        <p data-testid="instructions">{strInstructions}</p>

        <h2 data-testid="video">Video</h2>
        <YouTube
          videoId={ getYouTubeVideoId(strYoutube) }
          opts={ { height: '240', width: '360' } }
        />

        <Recommendation page={ page } recommendations={ drinks } />

        <button
          className="start-button"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => {
            handleClickStartRecipe(id, ingredients, page);
            navigate.push(`/comidas/${id}/in-progress`);
          } }
        >
          {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      </div>
    );
  }

  const { strDrinkThumb, strDrink, strCategory, strInstructions, strAlcoholic } = recipe;

  return (
    <div>
      <img src={ strDrinkThumb } width="150" alt="meal" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <h3 data-testid="recipe-category">
        {strAlcoholic === 'Alcoholic' ? 'Alcoholic' : strCategory}
      </h3>

      <div>
        <button type="button" data-testid="share-btn" onClick={ handleClickShare }>
          <img src={ shareIcon } alt="share icon" />
        </button>

        <button
          type="button"
          onClick={ () => handleClickFavorite(recipe, page) }
        >
          <img
            src={ favorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite icon"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      { copied && 'Link copiado!' }

      <h2>Ingredients</h2>
      <div>
        {
          ingredients.map((ing, index) => (
            <p
              key={ `${ing}-${index}` }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`-${ing} - ${measures[index]}`}
            </p>
          ))
        }
      </div>

      <h2>Instructions</h2>
      <p data-testid="instructions">{strInstructions}</p>

      <Recommendation page={ page } recommendations={ meals } />

      <button
        className="start-button"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => {
          handleClickStartRecipe(id, ingredients, page);
          navigate.push(`/bebidas/${id}/in-progress`);
        } }
      >
        { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>

    </div>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  commonProps: PropTypes.shape({
    page: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    measures: PropTypes.arrayOf(PropTypes.string).isRequired,
    inProgress: PropTypes.bool.isRequired,
    meals: PropTypes.arrayOf(PropTypes.object).isRequired,
    drinks: PropTypes.arrayOf(PropTypes.object).isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Recipe;
