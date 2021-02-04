import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';
import TitleContext from './TitleContext';
import getMealWithId from '../services/RecipesAPI';
import { fetchFoodsIngredients, fetchDrinksIngredients } from '../services/api';

function Provider({ children }) {
  const [mealDescription, setMealDescription] = useState({});
  const [foodsOrDrinksList, setFoodsOrDrinksList] = useState([]);
  const [foodsIngredientsList, setFoodsIngredientsList] = useState([]);
  const [drinksIngredientsList, setDrinksIngredientsList] = useState([]);
  const [isUse, setIsUse] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedTypeItem, setSelectedTypeItem] = useState('all');
  const fetchMealId = async (id = '52772') => {
    const x = await getMealWithId(id);
    setMealDescription(() => x);
    setIsFetching(() => false);
  };

  async function fetchIngredients() {
    const foodIngredients = await fetchFoodsIngredients();
    setFoodsIngredientsList(foodIngredients);

    const drinksIngredients = await fetchDrinksIngredients();
    setDrinksIngredientsList(drinksIngredients);
  }

  useEffect(() => {
    fetchIngredients();
  }, []);

  const contextValue = {
    foodsOrDrinksList,
    setFoodsOrDrinksList,
    fetchMealId,
    isFetching,
    mealDescription,
    foodsIngredientsList,
    drinksIngredientsList,
    isUse,
    setIsUse,
    selectedTypeItem,
    setSelectedTypeItem,
  };

  return (
    <TitleContext>
      <RecipesContext.Provider
        value={ contextValue }
      >
        {children}
      </RecipesContext.Provider>
    </TitleContext>
  );
}

Provider.propTypes = { children: PropTypes.element.isRequired };

export default Provider;
