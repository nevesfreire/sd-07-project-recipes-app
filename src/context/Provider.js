import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FoodAppContext from './FoodAppContext';
import { mealsAPI, drinksAPI } from '../services';

function Provider({ children }) {
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [fields, setFields] = useState({ term: '', type: '' });

  const getMealsDrinks = async () => {
    const { meals } = await mealsAPI();
    const { drinks } = await drinksAPI();
    setMealsData(meals);
    setDrinksData(drinks);
  };

  const handlerChange = ({ target }) => {
    const { name, value } = target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handlerClick = async () => {
    const { term, type } = fields;
    const { meals } = await mealsAPI(term, type);
    setMealsData(meals);
  };

  useEffect(() => {
    getMealsDrinks();
  }, []);

  const context = {
    fields,
    mealsData,
    drinksData,
    handlerChange,
    handlerClick,
  };

  return (
    <FoodAppContext.Provider value={ context }>
      { children }
    </FoodAppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape({}),
};

Provider.defaultProps = {
  children: {},
};

export default Provider;
