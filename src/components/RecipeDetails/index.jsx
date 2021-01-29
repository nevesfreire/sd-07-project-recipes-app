import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

import './style.css';

import Context from '../../Context';
import Meals from '../../services/meals-api';
import Drinks from '../../services/cocktails-api';
import Recommendation from '../Recommendation';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const filterFoodKeys = (food) => {
  const objKeys = Object.keys(food);

  const filteredIngredientKeys = objKeys.filter((key) => key.includes('strIngredient'));
  const filteredMeasureKeys = objKeys.filter((key) => key.includes('strMeasure'));

  const ingredientsObj = filteredIngredientKeys.map((key) => food[key]);
  const measuresObj = filteredMeasureKeys.map((key) => food[key]);

  const ingredientsObjFiltered = ingredientsObj.filter((ing) => ing);
  const measuresObjFiltered = measuresObj.filter((ing) => ing);

  return [ingredientsObjFiltered, measuresObjFiltered];
};

const getYouTubeVideoId = (url) => {
  if (!url) return 'MAiyzmLhIEw';

  const start = url.split('').findIndex((char) => char === '=');
  const videoId = url.slice(start + 1);

  return videoId;
};

const RecipeDetails = ({ page }) => {
  const { id } = useParams();
  const { handleClickStartRecipe, verifyInProgress } = useContext(Context);
  const [meal, setMeal] = useState({});
  const [drink, setDrink] = useState({});
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const isInProgress = verifyInProgress(id, page);
    if (isInProgress) {
      setInProgress(true);
    }
  }, [verifyInProgress, id, page]);

  useEffect(() => {
    const limitToShow = 6;

    if (page === 'meal') {
      Meals.getMealDetailsById(id)
        .then((res) => {
          const [filteredIngredients, filteredMeasures] = filterFoodKeys(res);
          setIngredients(filteredIngredients);
          setMeasures(filteredMeasures);
          setMeal(res);
          setIsFetching(false);
        })
        .catch((err) => console.log(err));

      Drinks.getCocktails(limitToShow)
        .then((res) => setDrinks(res))
        .catch((err) => console.log(err));
    }

    if (page === 'drink') {
      Drinks.getCocktailDetailsById(id)
        .then((res) => {
          const [filteredIngredients, filteredMeasures] = filterFoodKeys(res);
          setIngredients(filteredIngredients);
          setMeasures(filteredMeasures);
          setDrink(res);
          setIsFetching(false);
        })
        .catch((err) => console.log(err));

      Meals.getMeals(limitToShow)
        .then((res) => setMeals(res))
        .catch((err) => console.log(err));
    }
  }, [page, id]);

  if (isFetching) {
    return <h1>Loading details...</h1>;
  }

  if (page === 'meal') {
    const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = meal;

    return (
      <div>
        <img src={ strMealThumb } width="150" alt="meal" data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h3 data-testid="recipe-category">{strCategory}</h3>

        <div>
          <button type="button" data-testid="share-btn">
            <img src={ shareIcon } alt="share icon" />
          </button>

          <button type="button" data-testid="favorite-btn">
            <img src={ whiteHeartIcon } alt="favorite icon" />
          </button>
        </div>

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
          onClick={ () => handleClickStartRecipe(id, ingredients, page) }
        >
          { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
        </button>
      </div>
    );
  }

  const { strDrinkThumb, strDrink, strCategory, strInstructions, strAlcoholic } = drink;

  return (
    <div>
      <img src={ strDrinkThumb } width="150" alt="meal" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">{strDrink}</h1>
      <h3 data-testid="recipe-category">
        {strAlcoholic === 'Alcoholic' ? 'Alcoholic' : strCategory}
      </h3>

      <div>
        <button type="button" data-testid="share-btn">
          <img src={ shareIcon } alt="share icon" />
        </button>

        <button type="button" data-testid="favorite-btn">
          <img src={ whiteHeartIcon } alt="favorite icon" />
        </button>
      </div>

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
        onClick={ () => handleClickStartRecipe(id, ingredients, page) }
      >
        { inProgress ? 'Continuar Receita' : 'Iniciar Receita' }
      </button>

    </div>
  );
};

RecipeDetails.propTypes = { page: PropTypes.string.isRequired };

export default RecipeDetails;
