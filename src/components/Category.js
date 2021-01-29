import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
  getCategoryDrinks,
  getRecipesDrinksByCategory,
} from '../services/drinkAPI';
import {
  getCategoryFoods,
  getRecipesFoodsByCategory,
} from '../services/foodAPI';
import RecipesContext from '../context/RecipesContext';

function Category() {
  const { setRecipesFilters, recipesFilters } = useContext(RecipesContext);

  const [categorys, setCategorys] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const checkLocation = history.location.pathname;

    if (checkLocation === '/bebidas') {
      getCategoryDrinks().then((response) =>
        setCategorys(response.drinks.slice(0, 5)),
      );
    }
    if (checkLocation === '/comidas') {
      getCategoryFoods().then((response) =>
        setCategorys(response.meals.slice(0, 5)),
      );
    }
  }, []);

  const handleFilter = (filter) => {
    const checkLocation = history.location.pathname;

    if (checkLocation === '/bebidas') {
      getRecipesDrinksByCategory(filter).then((response) =>
        setRecipesFilters(
          recipesFilters.length === 0 ? response.drinks.slice(0, 12) : [],
        ),
      );
    }
    if (checkLocation === '/comidas') {
      getRecipesFoodsByCategory(filter).then((response) =>
        setRecipesFilters(
          recipesFilters.length === 0 ? response.meals.slice(0, 12) : [],
        ),
      );
    }
    console.log(recipesFilters);
  };

  return (
    <div>
      {categorys.map((category) => {
        const name = category.strCategory;
        const dataTestId = `${name}-category-filter`;
        return (
          <button
            data-testid={dataTestId}
            onClick={() => handleFilter(name)}
            key={name}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}

export default Category;
