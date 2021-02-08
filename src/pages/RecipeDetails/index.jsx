import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context';
import copyLink from '../../services/clipBoard';
import Ingredients from './Ingredients';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import Recomendations from './Recomendations';
import BlackHeartIcon from '../../images/blackHeartIcon.svg';

export default function RecipeDetails({ history, match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [showCopied, setShowCopied] = useState(false);
  const { favorites, disfavor, addToFavorites } = useContext(RecipesContext);
  const { location: { pathname } } = history;
  const path = pathname.split('/')[1];
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    strDrink,
    strAlcoholic,
    strDrinkThumb,
  } = recipeDetails;

  const url = () => {
    const youTubeURL = strYoutube.split('=')[1];
    return (
      <iframe
        data-testid="video"
        title="video"
        height="200"
        width="300"
        src={ `https://www.youtube.com/embed/${youTubeURL}` }
      />
    );
  };
  const fetchMealDetails = async () => {
    try {
      let endpoint = '';
      if (path === 'comidas') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      } else {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      const results = await fetch(endpoint)
        .then((response) => response.json())
        .then((details) => (details.meals ? details.meals : details.drinks));
      setRecipeDetails(results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const isFavorited = () => {
    if (recipeDetails.idMeal || recipeDetails.idDrink) {
      return favorites.some((recipe) => recipe.id === id);
    }
  };

  const addOrRemoveFavorites = () => {
    if (isFavorited()) {
      disfavor(id);
    } else {
      addToFavorites(recipeDetails);
    }
  };

  const shareLink = () => {
    const { length } = path;
    const zero = 0;
    const one = 1;
    const type = path.substring(zero, length - one);
    copyLink(id, type);
    setShowCopied(true);
  };

  useEffect(() => {
    fetchMealDetails();
  }, []);

  return (
    <div className="recipe-detail">
      <div className="container-title-image">
        <img
          className="recipe-photo"
          data-testid="recipe-photo"
          src={ strMealThumb || strDrinkThumb }
          alt="imagem do produto"
        />
        <h1 data-testid="recipe-title">
          { strMeal || strDrink }
        </h1>
        <button type="button">
          <img
            onClick={ shareLink }
            role="presentation"
            data-testid="share-btn"
            src={ ShareIcon }
            alt="share"
          />
        </button>
        <button
          type="button"
          onClick={ addOrRemoveFavorites }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorited() ? BlackHeartIcon : WhiteHeartIcon }
            alt="favorite recipe"
          />
          {/* acrescentar lógica para mudar icone se favoritada */}
        </button>
        { !showCopied || <p>Link copiado!</p>}
        <h4
          className="recipe-category"
          data-testid="recipe-category"
        >
          { strAlcoholic || strCategory }
        </h4>
      </div>
      <Ingredients recipeDetails={ recipeDetails } />
      <p data-testid="instructions">
        { strInstructions }
      </p>
      { strYoutube && url() }
      <Recomendations />
      <button
        type="button"
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
