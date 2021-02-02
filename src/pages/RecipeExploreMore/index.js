import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { fetchRecipeDetails } from '../../store/ducks/recipes';

const RecipeExploreMore = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const randomId = useSelector((state) => state.recipes.detailsRecipe.id);

  useEffect(() => {
    dispatch(fetchRecipeDetails(currentPath));
  }, [dispatch, currentPath]);

  if (currentPath.includes('bebidas')) {
    return (
      <div>
        <h2>Bebida</h2>
        <Link to="/explorar/bebidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to={ `/bebidas/${randomId}` }>
          <button type="button" data-testid="explore-surprise">
            Me Surpreenda!
          </button>
        </Link>
      </div>
    );
  } if (currentPath.includes('comidas')) {
    return (
      <div>
        <h2>Comida</h2>
        <Link to="/explorar/comidas/ingredientes">
          <button type="button" data-testid="explore-by-ingredient">
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button type="button" data-testid="explore-by-area">
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${randomId}` }>
          <button type="button" data-testid="explore-surprise">
            Me Surpreenda!
          </button>
        </Link>
      </div>
    );
  }
};

export default RecipeExploreMore;
