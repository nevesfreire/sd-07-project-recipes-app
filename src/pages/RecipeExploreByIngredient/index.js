import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getIngredientList, FILTER_TYPES } from '../../services/recipeAPI';
import { setFilter } from '../../store/ducks/recipes';

const RecipeExploreByIngredient = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const zero = 0;
  const twelve = 12;
  const [ingredientList, setIngredientList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getIngredientList(currentPath).then((r) => setIngredientList(r));
  });

  if (currentPath.includes('comidas')) {
    return (
      <div>
        {ingredientList
            && ingredientList.slice(zero, twelve).map((ing, index) => (
              <Link
                to="/comidas"
                data-testid={ `${index}-ingredient-card` }
                key={ ing.strIngredient }
                onClick={ () => {
                  dispatch(setFilter(FILTER_TYPES.INGREDIENT, ing.strIngredient));
                } }
              >
                <div>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.themealdb.com/images/ingredients/${ing.strIngredient}-Small.png` }
                    alt={ ing.strIngredient }
                  />
                  <div>
                    <h5 data-testid={ `${index}-card-name` }>
                      {ing.strIngredient}
                    </h5>
                  </div>
                </div>
              </Link>
            ))}
      </div>);
  } if (currentPath.includes('bebidas')) {
    return (
      <div>
        {ingredientList
            && ingredientList.slice(zero, twelve).map((ing, index) => (
              <Link
                to="/bebidas"
                data-testid={ `${index}-ingredient-card` }
                key={ ing.strIngredient1 }
                onClick={ () => {
                  dispatch(setFilter(FILTER_TYPES.INGREDIENT, ing.strIngredient1));
                } }
              >
                <div>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.thecocktaildb.com/images/ingredients/${ing.strIngredient1}-Small.png` }
                    alt={ ing.strIngredient1 }
                  />
                  <div>
                    <h5 data-testid={ `${index}-card-name` }>
                      {ing.strIngredient1}
                    </h5>
                  </div>
                </div>
              </Link>
            ))}
      </div>);
  }
};

export default RecipeExploreByIngredient;
