import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';
import TitleContext from './TitleContext';
import getMealWithId, {
  getDrinkWithId,
  getRecomendationDrink,
  getRecomendationMeal,
} from '../services/RecipesAPI';
import { fetchFoodsIngredients, fetchDrinksIngredients } from '../services/api';

function Provider({ children }) {
  const [mealDescription, setMealDescription] = useState({});
  const [foodsOrDrinksList, setFoodsOrDrinksList] = useState([]);
  const [foodsIngredientsList, setFoodsIngredientsList] = useState([]);
  const [drinksIngredientsList, setDrinksIngredientsList] = useState([]);
  const [isUse, setIsUse] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [recomendation, setRecomendation] = useState({});
  const [selectedTypeItem, setSelectedTypeItem] = useState('all');

  const fetchRecomendation = async (tipo = undefined) => {
    if (tipo === 'comida') {
      const recomend = await getRecomendationDrink();
      setRecomendation(recomend);
    } else {
      const recomend = await getRecomendationMeal();
      setRecomendation(recomend);
    }
  };

  const fetchMealId = async (id, tipo = undefined) => {
    await fetchRecomendation(tipo);
    setIsFetching(() => false);

    if (tipo === 'comida') {
      const x = await getMealWithId(id);
      setMealDescription(() => x);
      return false;
    }

    const y = await getDrinkWithId(id);
    setMealDescription(() => y);
    return true;
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
    setIsFetching,
    recomendation,
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
