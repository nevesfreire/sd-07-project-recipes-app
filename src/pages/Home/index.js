import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchRecipes } from '../../store/ducks/recipes';
import { RecipeCardList } from '../../components';

const Home = () => {
  const recipes = useSelector((state) => state.recipes.data);
  const isLoading = useSelector((state) => state.recipes.isFetching);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const START_INDEX = 0;
  const END_INDEX = 12; // 12 cards - 12 not included

  useEffect(() => {
    const getRecipes = async (type) => dispatch(await fetchRecipes(type));
    getRecipes(pathname);
  }, [dispatch, pathname]);

  return (
    <>
      <h1>
        {`PAGE HOME - open by ${pathname}`}
      </h1>
      {isLoading ? 'Loading...' : ''}
      { recipes
        && <RecipeCardList recipeList={ recipes.slice(START_INDEX, END_INDEX) } /> }
    </>
  );
};

export default Home;
