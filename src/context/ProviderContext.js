import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import {
  getFoodFirstLetter,
  getFoodIngredients,
  getFoodName,
  getDrinkFirstLetter,
  getDrinkName,
  getDrinkIngredients,
} from '../services/Api';

function ProviderContext({ children }) {
  const [showBtn, setShowBtn] = useState(false);
  const [data, setData] = useState({ food: [], drink: [], ingredient: '' });

  useEffect(() => {
    const getApiFoodDrink = async () => {
      setData({ ...data,
        food: await getFoodName(''),
        drink: await getDrinkName(''),
      });
    };
    getApiFoodDrink();
  }, []);

  const searchClick = () => (
    showBtn === true ? setShowBtn(false) : setShowBtn(true)
  );

  const getApi = async (valueRadio, pathname, valueInput) => {
    switch (valueRadio) {
    case ('ingredient'):
      return pathname === '/comidas'
        ? setData({
          ...data,
          food: await getFoodIngredients(valueInput) })
        : setData({
          ...data,
          drink: await getDrinkIngredients(valueInput) });

    case ('name'):
      return pathname === '/comidas'
        ? setData({
          ...data,
          food: await getFoodName(valueInput) })
        : setData({
          ...data,
          drink: await getDrinkName(valueInput) });

    case ('firstLetter'):
      if (valueInput.length > 1) {
        return window.alert(
          'Sua busca deve conter somente 1 (um) caracter',
        );
      }
      return pathname === '/comidas'
        ? setData({
          ...data,
          food: await getFoodFirstLetter(valueInput) })
        : setData({
          ...data,
          drink: await getDrinkFirstLetter(valueInput) });
    default:
      break;
    }
  };

  const contextValue = {
    showBtn,
    searchClick,
    data,
    setData,
    getApi,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      {children}
    </RecipeContext.Provider>
  );
}

ProviderContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderContext;
