import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchCategoriesCocktails } from '../../API/apiCocktails';
import RecipeContext from '../../Context/RecipeContext';
import { fetchCategoriesMeals } from '../../API/apiMeals';

const CategoryList = (props) => {
  const { page } = props;
  const { dispatch } = useContext(RecipeContext);
  const {
    state: { mealsCategory, cocktailsCategory },
  } = useContext(RecipeContext);

  useEffect(() => {
    fetchCategoriesMeals().then((arrayLimit) => dispatch({
      type: 'SET_CATEGORIES_MEALS',
      data: arrayLimit,
    }));
    fetchCategoriesCocktails().then((arrayLimit) => dispatch({
      type: 'SET_CATEGORIES_COCKTAILS',
      data: arrayLimit,
    }));
  }, [dispatch]);

  const mapButtonCallBack = ({ strCategory }) => (
    <button
      key={ strCategory }
      type="button"
      data-testid={ `${strCategory}-category-filter` }
    >
      {strCategory}
    </button>
  );

  const mealsCategoriesDoc = () => (
    <div>
      {mealsCategory.map(mapButtonCallBack)}
    </div>
  );

  const cocktailsCategoriesDoc = () => (
    <div>
      {cocktailsCategory.map(mapButtonCallBack)}
    </div>
  );

  return page === 'comidas' ? mealsCategoriesDoc() : cocktailsCategoriesDoc();
};

export default CategoryList;

CategoryList.propTypes = {
  page: PropTypes.string.isRequired,
};
