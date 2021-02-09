import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchRecipesByFilter } from '../../store/ducks/recipes';
import { RecipeCardList, RecipeCategoryFilter, Header, Footer } from '../../components';

const Home = () => {
  const recipes = useSelector((state) => state.recipes.data);
  const isLoading = useSelector((state) => state.recipes.isFetching);
  const filterOrigin = useSelector((state) => state.recipes.filterOrigin);
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const START_INDEX = 0;
  const END_INDEX = 12; // 12 cards - 12 not included

  useEffect(() => {
    if (!filterOrigin) {
      dispatch(fetchRecipesByFilter(pathname));
    }
  }, [dispatch, pathname, filterOrigin]);

  useEffect(() => {
    const resultValidation = () => {
      if (filterOrigin === 'searchbar') {
        if (!recipes.length) {
          alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
        } else if (recipes.length === 1) {
          history.push(`${pathname}/${recipes[0].id}`);
        }
      }
    };
    resultValidation();
  }, [history, recipes, pathname, filterOrigin]);

  return (
    <div>
      <Header
        title={ pathname.includes('comidas') ? 'Comidas' : 'Bebidas' }
        showSearchIcon
      />
      {isLoading ? 'Loading...' : ''}
      <RecipeCategoryFilter />
      { recipes
        && <RecipeCardList recipeList={ recipes.slice(START_INDEX, END_INDEX) } /> }
      <Footer />
    </div>
  );
};

export default Home;
