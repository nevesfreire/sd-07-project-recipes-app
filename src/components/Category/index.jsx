import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { RecipesContext } from '../../context';
import './Category.css';

export default function Category({ category, fetchRandomFoods, fetchDrinks }) {
  const { setMeals, setDrinks } = useContext(RecipesContext);
  const { location } = useHistory();
  const [isClicked, setIsClicked] = useState(false);

  const filterOnClick = async (value) => {
    const { pathname } = location;

    setIsClicked((prevState) => !prevState);
    if (pathname === '/comidas') {
      if (!isClicked) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`);
        const results = await response.json();
        setMeals(results.meals);
      } else {
        fetchRandomFoods();
      }
    } else if (pathname === '/bebidas') {
      if (!isClicked) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`);
        const results = await response.json();
        setDrinks(results.drinks);
      } else {
        fetchDrinks();
      }
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
  fetchRandomFoods: PropTypes.func.isRequired,
  fetchDrinks: PropTypes.func.isRequired,
};
