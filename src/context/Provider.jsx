import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';
import TitleContext from './TitleContext';
import getMealWithId from '../services/RecipesAPI';

function Provider({ children }) {
  const [mealDescription, setMealDescription] = useState({});
  const [foodsOrDrinksList, setFoodsOrDrinksList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedTypeItem, setSelectedTypeItem] = useState('all');
  const fetchMealId = async (id = '52772') => {
    const x = await getMealWithId(id);
    setMealDescription(() => x);
    setIsFetching(() => false);
  };

  const contextValue = {
    foodsOrDrinksList,
    setFoodsOrDrinksList,
    fetchMealId,
    isFetching,
    mealDescription,
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
