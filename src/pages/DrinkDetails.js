import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import { fetchAPI, handleIngredients,
  SIX, TWENTY_ONE, THIRTY_SIX, FIFTY_ONE } from '../services/helpers';
import '../style/recipeDetail.css';

function DrinkDetails() {
  const [recommendation, setRecommendation] = useState(['']);
  const history = useHistory();
  const { pathname } = history.location;
  const drinkRecipeId = pathname.split('/')[2];

  const {
    recipeDetailDrink,
    setDrinkRecipeId,
    setMealRecipeId,
    setRecipeDetailDrink,
  } = useContext(RecipesContext);

  useEffect(() => {
    const getAPI = async () => {
      const drink = await fetchAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkRecipeId}`);
      const recipeDrink = await drink.drinks;
      setRecipeDetailDrink(recipeDrink[0]);
      setDrinkRecipeId(drinkRecipeId);
    };
    getAPI();
  }, [drinkRecipeId, setDrinkRecipeId, setRecipeDetailDrink]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      const foods = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const foodsData = await foods.meals;
      setRecommendation(foodsData);
    };
    fetchRecommendation();
  }, []);

  const handleCopyClick = () => {
    copy(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkRecipeId}`);
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ recipeDetailDrink.strDrinkThumb }
        alt="drink"
      />
      <h2 data-testid="recipe-title">{recipeDetailDrink.strDrink}</h2>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleCopyClick }
      >
        Share
      </button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <p data-testid="recipe-category">{recipeDetailDrink.strAlcoholic}</p>
      <ul>
        {handleIngredients(recipeDetailDrink, TWENTY_ONE, THIRTY_SIX, FIFTY_ONE)}
      </ul>
      <p data-testid="instructions">{recipeDetailDrink.strInstructions}</p>
      <div>
        {
          recommendation && recommendation.length && recommendation
            .filter((_, indexs) => indexs < SIX)
            .map((meals, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key="index"
              >
                <Link
                  onClick={ () => setMealRecipeId(meals.idMeal) }
                  to={ `/comidas/${meals.idMeal}` }
                  key={ index }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ meals.strMealThumb }
                    alt={ meals.strMeal }
                  />
                </Link>
                <p
                  data-testid={ `${index}-recomendation-title` }
                >
                  {meals.strMeal}
                </p>
              </div>
            ))
        }
      </div>
      <Link to={ `/bebidas/${drinkRecipeId}/in-progress` }>
        <button
          className="fixedbutton"
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </Link>
    </div>
  );
}

export default DrinkDetails;
