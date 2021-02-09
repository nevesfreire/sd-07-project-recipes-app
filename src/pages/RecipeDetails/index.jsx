import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FavoriteButton, ShareButton } from '../../components';
import Ingredients from './Ingredients';
import Recomendations from './Recomendations';

export default function RecipeDetails({ history, match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const { location: { pathname } } = history;
  const path = pathname.split('/')[1];
  const {
    idMeal,
    idDrink,
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

  const startRecipe = () => (
    idMeal
      ? history.push(`/comidas/${idMeal}/in-progress`)
      : history.push(`/bebidas/${idDrink}/in-progress`)
  );

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
        <ShareButton path={ path } id={ id } />
        <FavoriteButton id={ id } recipeDetails={ recipeDetails } />
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
        onClick={ startRecipe }
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
    push: PropTypes.func.isRequired,
  }).isRequired,
};
