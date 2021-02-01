import React, { useState, useEffect } from 'react';
import { fetchAPI, TWELVE } from '../services/helpers';

function DrinkIngredient() {
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      const data = await fetchAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const ingredients = await data.drinks;
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
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                alt="ingredient"
              />
              <p
                key={ index }
                data-testid={ `${index}-card-name` }
              >
                {ingredient.strIngredient1}
              </p>
            </div>
          ))
      }
    </div>
  );
}

export default DrinkIngredient;
