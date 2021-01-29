import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import history from '../history/history';

function Provider({ children }) {

  const messageAlert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const zero = 0;
  const showAlertNotFound = () => alert(messageAlert);
  const [searchRender, setSearchRender] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');
  const [recipesFilters, setRecipesFilters] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [getSearchBtn, setSearchBtn] = useState(false);
  const [mealRecipeId, setMealRecipeId] = useState('52771');
  const [drinkRecipeId, setDrinkRecipeId] = useState('178319');
  const [recipeDetailFood, setRecipeDetailFood] = useState({});
  const [recipeDetailDrink, setRecipeDetailDrink] = useState({});

  const checkRecipe = () => {
    if (recipesFilters === null) {
      showAlertNotFound();
    }
  };

  useEffect(
    checkRecipe,
    [recipesFilters],
  );

  useEffect(() => {
    if (recipesFilters !== null && recipesFilters.length === 1) {
      const lastHistory = history.location.pathname;
      let id;
      if (lastHistory === '/bebidas') {
        const { idDrink } = recipesFilters[zero];
        id = idDrink;
      } else {
        const { idMeal } = recipesFilters[zero];
        id = idMeal;
      }
      history.push(`${lastHistory}/${id}`);
    }
  }, [recipesFilters]);


 const context = {
    mealRecipeId,
    drinkRecipeId,
    recipeDetailFood,
    recipeDetailDrink,
    filterSearch,
    searchRender,
    searchInput,
    getSearchBtn,
    recipesFilters,
    setRecipesFilters,
    setSearchBtn,
    setSearchInput,
    setFilterSearch,
    setSearchRender,
    setMealRecipeId,
    setDrinkRecipeId,
    setRecipeDetailFood,
    setRecipeDetailDrink,

  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
