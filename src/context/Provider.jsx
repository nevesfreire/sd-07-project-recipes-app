import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';
import TitleContext from './TitleContext';
import getMealWithId, {
  getDrinkWithId,
  getRecomendationDrink,
  getRecomendationMeal,
} from '../services/RecipesAPI';

function Provider({ children }) {
  const [mealDescription, setMealDescription] = useState({});
  const [foodsOrDrinksList, setFoodsOrDrinksList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [recomendation, setRecomendation] = useState({});

  const fetchRecomendation = async (tipo = undefined) => {
    if (tipo === 'comida') {
      const recomend = await getRecomendationDrink();
      console.log(recomend);
      setRecomendation(recomend);
    } else {
      const recomend = await getRecomendationMeal();
      setRecomendation(recomend);
    }
  };

  const fetchMealId = async (id, tipo = undefined) => {
    if (tipo === 'comida') {
      const x = await getMealWithId(id);
      await fetchRecomendation(tipo);
      setMealDescription(() => x);
      setIsFetching(() => false);
      return false;
    }
    const x = await getDrinkWithId(id);
    await fetchRecomendation();
    setMealDescription(() => x);
    setIsFetching(() => false);
    return false;
  };

  const contextValue = {
    foodsOrDrinksList,
    setFoodsOrDrinksList,
    fetchMealId,
    isFetching,
    mealDescription,
    setIsFetching,
    recomendation,
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
