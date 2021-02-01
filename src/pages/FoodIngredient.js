import React, { useState, useEffect } from 'react';
import { fetchAPI, TWELVE } from '../services/helpers';

function FoodIngredient() {
  const [ingredientsList, setIngredientsList] = useState([]);
  useEffect(() => {
    const getAPI = async () => {
      const data = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const ingredients = await data.meals;
      setIngredientsList(ingredients);
    };
    getAPI();
  }, []);

  return (
    <div>
      {
        ingredientsList.filter((_, indexFilter) => indexFilter < TWELVE)
          .map((ingredient, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-card` }>
              <img
                key={ index }
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                alt="ingredient"
              />
              <p
                key={ index }
                data-testid={ `${index}-card-name` }
              >
                {ingredient.strIngredient}
              </p>
            </div>
          ))
      }
    </div>
  );
}

export default FoodIngredient;
