import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Header, Footer } from '../../components';
import { fetchRandomRecipe } from '../../store/ducks/recipes';

const RecipeExploreMore = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const randomId = useSelector((state) => state.recipes.detailsRecipe.id);

  useEffect(() => {
    dispatch(fetchRandomRecipe(currentPath));
  }, [dispatch, currentPath]);

  if (currentPath.includes('bebidas')) {
    return (
      <div>
        <Header
          title="Explorar Bebidas"
          showSearchIcon={ false }
        />
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
        <Footer />
      </div>
    );
  } if (currentPath.includes('comidas')) {
    return (
      <div>
        <Header
          title="Explorar Comidas"
          showSearchIcon={ false }
        />
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
        <Footer />
      </div>
    );
  }
};

export default RecipeExploreMore;
