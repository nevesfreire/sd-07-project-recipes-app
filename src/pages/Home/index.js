import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import { fetchRecipesByFilter } from '../../store/ducks/recipes';
import { RecipeCardList, RecipeCategoryFilter, Header, Footer } from '../../components';
import { FILTER_TYPES } from '../../services/recipeAPI';

const Home = () => {
  const recipes = useSelector((state) => state.recipes.data);
  const isLoading = useSelector((state) => state.recipes.isFetching);
  const filter = useSelector((state) => state.recipes.filter);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const START_INDEX = 0;
  const END_INDEX = 12; // 12 cards - 12 not included

  const resultValidation = () => {
    if (
      filter
      && filter.type
      && (filter.type === FILTER_TYPES.INGREDIENT
        || filter.type === FILTER_TYPES.FIRST_LETTER
        || filter.type === FILTER_TYPES.NAME)
      && !recipes.length
      && !isLoading
    ) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (
      filter
      && filter.type
      && (filter.type === FILTER_TYPES.INGREDIENT
        || filter.type === FILTER_TYPES.FIRST_LETTER
        || filter.type === FILTER_TYPES.NAME)
      && recipes.length === 1
      && !isLoading
    ) {
      return <Redirect to={ `${pathname}/${recipes[0].id}` } />;
    }
  };

  useEffect(() => {
    dispatch(fetchRecipesByFilter(pathname, filter.type, filter.term));
  }, [dispatch, pathname, filter]);

  return (
    <div>
      <Header
        title={ pathname.includes('comidas') ? 'Comidas' : 'Bebidas' }
        showSearchBar
      />
      { resultValidation() }
      {isLoading ? 'Loading...' : ''}
      <RecipeCategoryFilter />
      { recipes
        && <RecipeCardList recipeList={ recipes.slice(START_INDEX, END_INDEX) } /> }
      <Footer />
    </div>
  );
};

export default Home;
