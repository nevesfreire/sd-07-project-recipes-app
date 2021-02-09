import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FavoriteButton, ShareButton } from '../../components';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';

export default function RecipeInProgress({ history, match: { params: { id } } }) {
  const [recipesInProgress, setRecipesInProgress] = useState([]);
  const { location: { pathname } } = history;
  const path = pathname.split('/')[1];
  const fetchFoodDetails = async () => {
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
      // const resultsFiltered = await results.filter((key) => key.value !== null);
      setRecipesInProgress(results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    idMeal,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strDrinkAlternate,
    idDrink,
    strDrink,
    strAlcoholic,
    strDrinkThumb,
  } = recipesInProgress;

  const teste = Object.keys(recipesInProgress);
  console.log(recipesInProgress);
  console.log(teste);
  const ingredients = teste.filter((item) => item.includes('strIngredient'));
  console.log(ingredients);
  const measures = teste.filter((item) => item.includes('strMeasure'));

  const arrayVazio = [];
  ingredients.forEach((ingredient, index) => {
    if (
      (recipesInProgress[ingredient]
      && recipesInProgress[ingredient] !== ' '
      && recipesInProgress[ingredient] !== null)) {
      arrayVazio.push([recipesInProgress[ingredient],
        recipesInProgress[measures[index]]]);
    }
  });

  useEffect(() => {
    fetchFoodDetails();
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
        <FavoriteButton id={ id } recipeDetails={ recipesInProgress } />
        <button type="button" data-testid="favorite-btn">
          <img src={ WhiteHeartIcon } alt="favorite recipe" />
          {/* acrescentar lógica para mudar icone se favoritada */}
        </button>
        <h4
          className="recipe-category"
          data-testid="recipe-category"
        >
          { strCategory || strAlcoholic }
        </h4>
      </div>
      <div className="container-ingredients">
        { arrayVazio
          .map((name, index) => (
            <label
              key={ index }
              htmlFor={ `${index}-ingredient` }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                key={ index }
                data-testid={ `${index}-ingredient` }
                value={ index }
              />
              <span>
                { name[1] !== null ? `${name[0]} - ${name[1]}` : `${name[0]}` }
              </span>
            </label>
          ))}
      </div>
      <p data-testid="instructions">
        { strInstructions }
      </p>
      <div data-testid={ `${idMeal || idDrink}-recomendation-card` }>
        { strDrinkAlternate }
      </div>
      <button type="button" data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
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
