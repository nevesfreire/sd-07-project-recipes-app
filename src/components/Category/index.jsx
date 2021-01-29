import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context';

export default function Category({ category }) {
  const { setMeals, setDrinks } = useContext(RecipesContext);
  const { location } = useHistory();

  const filterOnClick = async (value) => {
    const { pathname } = location;

    if (pathname === '/comidas') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
      const results = await response.json();
      setMeals(results.meals);
    } else {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`);
      const results = await response.json();
      setDrinks(results.drinks);
    }
  };

  return (
    <button
      type="button"
      data-testid={ `${category.strCategory}-category-filter` }
      onClick={ () => filterOnClick(category.strCategory) }
    >
      { category.strCategory }
    </button>
  );
}

Category.propTypes = {
  category: PropTypes.shape().isRequired,
};
