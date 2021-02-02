import React, { useState, useContext, useEffect } from 'react';
import RecipeContext from '../Context/Context';
import useFetch from '../hooks/useFetch';

function FoodInProgress() {
  const { detailsRecipe } = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  const { recipeDetailsAPI } = useFetch();

  const url = document.URL;
  const newUrlId = url.split('/')[4];
  const newUrlType = url.split('/')[3];

  useEffect(() => {
    recipeDetailsAPI(newUrlId, newUrlType)
      .then(() => setLoading(false));
  }, []);

  if (loading) {
    return (<div>Loading...</div>);
  }

  const { strCategory,
    strMeal,
    strMealThumb,
    strInstructions,
  } = detailsRecipe.meals[0];

  const meal = detailsRecipe.meals[0];
  const keysMeal = Object.keys(meal);
  const filterMeal = keysMeal
    .filter((key) => key.toLowerCase().includes('ingredient'));
  const filterMeasure = keysMeal
    .filter((key) => key.toLowerCase().includes('measure'));
  const allIngredients = filterMeal
    .map((item, index) => ({
      ingredient: meal[item], measure: meal[filterMeasure[index]],
    })).filter((item) => item.ingredient !== '' && item.ingredient !== null);

  return (
    <div>
      <img src={ strMealThumb } data-testid="recipe-photo" alt={ strMeal } />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">{strCategory}</p>
      <div id="ingredients-div">
        {allIngredients && allIngredients
          .map((item, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <label htmlFor={ item.ingredient }>
                <input
                  type="checkbox"
                  id={ item.ingredient }
                />
                {
                  `${index + 1} - ${item.ingredient}: ${item.measure}`
                }
              </label>
            </div>
          ))}
      </div>
      <p
        data-testid="instructions"
      >
        {strInstructions}

      </p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finalizar receita

      </button>
    </div>);
}

export default FoodInProgress;
