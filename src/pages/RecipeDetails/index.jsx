import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import Recomendations from './Recomendations';

// import BlackHeartIcon from '../../images/blackHeartIcon.svg';

export default function RecipeDetails({ history, match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const fetchMealDetails = async () => {
    try {
      let endpoint = '';
      const { location: { pathname } } = history;
      const path = pathname.split('/')[1];
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

  const teste = Object.keys(recipeDetails);
  const ingredients = teste.filter((item) => item.includes('strIngredient'));
  const measures = teste.filter((item) => item.includes('strMeasure'));

  const arrayVazio = [];
  ingredients.forEach((ingredient, index) => {
    if (
      (recipeDetails[ingredient]
      && recipeDetails[ingredient] !== ' '
      && recipeDetails[ingredient] !== null)) {
      arrayVazio.push([recipeDetails[ingredient], recipeDetails[measures[index]]]);
    }
  });

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
        <button type="button" data-testid="share-btn">
          <img src={ ShareIcon } alt="share" />
        </button>
        <button type="button" data-testid="favorite-btn">
          <img src={ WhiteHeartIcon } alt="favorite recipe" />
          {/* acrescentar lógica para mudar icone se favoritada */}
        </button>
        <h4
          className="recipe-category"
          data-testid="recipe-category"
        >
          { strAlcoholic || strCategory }
        </h4>
      </div>
      <ul className="container-ingredients">
        { arrayVazio.map((name, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            { name[1] !== null ? `${name[0]} - ${name[1]}` : `${name[0]}` }
          </li>
        ))}
      </ul>
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
