import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getIngredientList, getRecipesByIngredient } from '../../services/recipeAPI';

const RecipeExploreByIngredient = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const zero = 0;
  const twelve = 12;

  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    getIngredientList('comidas')
      .then((response) => setIngredientList(response));
    // .then(() => console.log(typeof ingredientList));
    // setIngredientList(response)
    getIngredientList('bebidas')
      .then((response) => console.log(response));
  }, []);

  if (currentPath.includes('comidas')) {
    return (
      <div>
        {ingredientList
            && ingredientList.slice(zero, twelve).map((ingredient, index) => (
              <Link
                to="/comidas"
                data-testid={ `${index}-ingredient-card` }
                key={ ingredient.strIngredient }
                onClick={ () => {
                  getRecipesByIngredient('comidas', ingredient.strIngredient)
                    .then((response) => console.log(response));
                } }
              >
                <div>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png` }
                    alt={ ingredient.strIngredient }
                  />
                  <div>
                    <h5 data-testid={ `${index}-card-name` }>
                      {ingredient.strIngredient}
                    </h5>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    );
  } if (currentPath.includes('bebidas')) {
    return (
      <div>
        {ingredientList
            && ingredientList.slice(zero, twelve).map((ingredient, index) => (
              <Link
                to="/bebidas"
                data-testid={ `${index}-ingredient-card` }
                key={ ingredient.strIngredient }
                onClick={ () => {
                  getRecipesByIngredient('bebidas', ingredient.strIngredient)
                    .then((response) => console.log(response));
                } }
              >
                <div>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png` }
                    alt={ ingredient.strIngredient }
                  />
                  <div>
                    <h5 data-testid={ `${index}-card-name` }>
                      {ingredient.strIngredient}
                    </h5>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    );
  }
};

export default RecipeExploreByIngredient;
