import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import { fetchAPI, handleIngredients,
  SIX, NINE, TWENTY_NINE, FOURTY_NINE } from '../services/helpers';

function FoodDetails() {
  const [recommendation, setRecommendation] = useState(['']);

  const {
    recipeDetailFood,
    mealRecipeId,
    setDrinkRecipeId,
    setRecipeDetailFood,
  } = useContext(RecipesContext);

  useEffect(() => {
    const getAPI = async () => {
      const food = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealRecipeId}`);
      const recipeFood = await food.meals;
      setRecipeDetailFood(recipeFood[0]);
    };
    getAPI();
  }, [mealRecipeId, setRecipeDetailFood]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      const drinks = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const drinksData = await drinks.drinks;
      setRecommendation(drinksData);
    };
    fetchRecommendation();
  }, []);

  const handleCopyClick = () => {
    copy(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealRecipeId}`);
  };

  return (
    <div>
      <img data-testid="recipe-photo" src={ recipeDetailFood.strMealThumb } alt="food" />
      <h2 data-testid="recipe-title">{recipeDetailFood.strMeal}</h2>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleCopyClick }
      >
        Share
      </button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      <p data-testid="recipe-category">{recipeDetailFood.strCategory}</p>
      <ul>
        {handleIngredients(recipeDetailFood, NINE, TWENTY_NINE, FOURTY_NINE)}
      </ul>
      <p data-testid="instructions">{recipeDetailFood.strInstructions}</p>
      <video data-testid="video" width="750" height="500" controls>
        <source src={ recipeDetailFood.strYoutube } type="video/mp4" />
        <track src={ recipeDetailFood.strYoutube } kind="captions" />
      </video>
      <div>
        {
          recommendation && recommendation.length && recommendation
            .filter((_, indexFilter) => indexFilter < SIX)
            .map((drinks, index) => (
              <div
                data-testid={ `${index}-recomendation-card` }
                key={ index }
              >
                <Link
                  onClick={ () => setDrinkRecipeId(drinks.idDrink) }
                  to={ `/bebidas/${drinks.idDrink}` }
                  key={ index }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ drinks.strDrinkThumb }
                    alt={ drinks.strDrink }
                  />
                </Link>
                <p
                  data-testid={ `${index}-recomendation-title` }
                >
                  {drinks.strDrink}
                </p>
              </div>
            ))
        }
      </div>
      <Link to={ `/comidas/${mealRecipeId}/in-progress` }>
        <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
      </Link>
    </div>
  );
}

export default FoodDetails;
