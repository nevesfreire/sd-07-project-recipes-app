import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';
import TitleContext from './TitleContext';
import getMealWithId, { getDrinkWithId } from '../services/RecipesAPI';

function Provider({ children }) {
  const [mealDescription, setMealDescription] = useState({});
  const [foodsOrDrinksList, setFoodsOrDrinksList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const fetchMealId = async (id, tipo = undefined) => {
    if (tipo === 'comida') {
      console.log();
      const x = await getMealWithId(id);
      setMealDescription(() => x);
      setIsFetching(() => false);
      return false;
    }
    const x = await getDrinkWithId(id);
    console.log(id);
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
