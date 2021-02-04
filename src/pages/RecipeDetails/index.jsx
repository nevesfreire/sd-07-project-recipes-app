import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
// import BlackHeartIcon from '../../images/blackHeartIcon.svg';

export default function RecipeDetails({ history, match: { params: { id } } }) {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recomendationList, setRecomendationList] = useState([]);
  const fetchMealDetails = async () => {
    try {
      let endpoint = '';
      const { location: { pathname } } = history;
      const path = pathname.split('/')[1];
      console.log(path);
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

  const fetchRecomendations = async () => {
    try {
      let endpoint = '';
      const { location: { pathname } } = history;
      const path = pathname.split('/')[1];
      console.log(path);
      if (path === 'comidas') {
        endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      } else {
        endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      }
      const results = await fetch(endpoint)
        .then((response) => response.json())
        .then((details) => (details.meals ? details.meals : details.drinks));
      setRecomendationList(results);
    } catch (error) {
      console.log(error);
    }
  };

  const recomendations = () => (
    recomendationList.map((item) => (
      <div
        key={ item.index }
        className="container-title-image"
        data-testid={ `${item.index}-recomendation-card` }
      >
        <img
          className="recipe-photo"
          data-testid="recipe-photo"
          src={ item.strMealThumb || item.strDrinkThumb }
          alt="imagem do produto"
          width="200"
        />
        <h1 data-testid="recipe-title">
          { item.strMeal || item.strDrink }
        </h1>
        <h4
          className="recipe-category"
          data-testid="recipe-category"
        >
          { item.strAlcoholic || item.strCategory }
        </h4>
      </div>
    ))
  );

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
    console.log(youTubeURL);
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
  console.log(teste);
  const ingredients = teste.filter((item) => item.includes('strIngredient'));
  console.log(ingredients);
  const measures = teste.filter((item) => item.includes('strMeasure'));

  const ops = ingredients
    .map((item, index) => [item, measures[index]]);
  console.log(ops);

  useEffect(() => {
    fetchMealDetails();
    fetchRecomendations();
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
        { ops.map((name, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            { `${recipeDetails[name[0]]} - ${recipeDetails[name[1]]}` }
          </li>
        ))}
      </ul>
      <p data-testid="instructions">
        { strInstructions }
      </p>
      { strYoutube && url() }
      { recomendations() }
      <button type="button" data-testid="start-recipe-btn">
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
