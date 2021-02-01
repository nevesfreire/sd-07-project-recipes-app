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
  const [filterSelected, setFilterSelected] = useState('');
  const [initialRecipes, setInitialRecipes] = useState();

  const history = useHistory();
  const checkLocation = history.location.pathname;

  useEffect(() => {
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
    setInitialRecipes(recipesFilters);
  }, []);

  const handleFilter = (filter) => {
    //se o avaliador não passar criar um estado de ultimo filtro selecionado, depois comparar se o param filter === lastFilter
    if (filterSelected === filter) {
      // ao inves de limpar com [] retornar o que estava antes, da onde está vindo as informações padrões de comidas e bebidas?
      setRecipesFilters(initialRecipes);
      setFilterSelected('');
    }

    if (filterSelected === '' || filterSelected !== filter) {
      setFilterSelected(filter);

      if (checkLocation === '/bebidas') {
        getRecipesDrinksByCategory(filter).then((response) =>
          setRecipesFilters(response.drinks.slice(0, 12)),
        );
      }
      if (checkLocation === '/comidas') {
        getRecipesFoodsByCategory(filter).then((response) =>
          setRecipesFilters(response.meals.slice(0, 12)),
        );
      }
    }
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
