import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchRecipes, fetchRecipesByCategory } from '../../store/ducks/recipes';
import { Footer, RecipeCardList, RecipeCategoryFilter } from '../../components';

const Home = () => {
  const recipes = useSelector((state) => state.recipes.data);
  const isLoading = useSelector((state) => state.recipes.isFetching);
  const filterByCategory = useSelector((state) => state.recipes.filterByCategory);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const START_INDEX = 0;
  const END_INDEX = 12; // 12 cards - 12 not included

  useEffect(() => {
    const getRecipes = (type, category) => {
      if (category) {
        dispatch(fetchRecipesByCategory(type, category));
      } else {
        dispatch(fetchRecipes(type));
      }
    };
    getRecipes(pathname, filterByCategory);
  }, [dispatch, pathname, filterByCategory]);

  return (
    <>
      <h1>
        {`PAGE HOME - open by ${pathname}`}
      </h1>
      {isLoading ? 'Loading...' : ''}
      <RecipeCategoryFilter />
      { recipes
        && <RecipeCardList recipeList={ recipes.slice(START_INDEX, END_INDEX) } /> }
      <Footer />
    </>
  );
};

export default Home;
