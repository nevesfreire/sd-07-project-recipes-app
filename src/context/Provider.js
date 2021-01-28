import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FoodAppContext from './FoodAppContext';
import { mealsAPI, drinksAPI } from '../services';

function Provider({ children }) {
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);

  const [fields, setFields] = useState({ term: '', type: '' });

  const getMealsDrinks = async () => {
    const { meals } = await mealsAPI(fields.term, fields.type);
    const { drinks } = await drinksAPI(fields.term, fields.type);
    setMealsData(meals);
    setDrinksData(drinks);
  };

  const [showSearch, setShowSearch] = useState(false);

  const handlerChange = ({ target }) => {
    const { name, value } = target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handlerClick = async ({ target }) => {
    const { value } = target;
    const { term, type } = fields;
    if (value === 'Comidas') {
      const { meals } = await mealsAPI(term, type);
      setMealsData(meals);
    } else {
      const { drinks } = await drinksAPI(term, type);
      setDrinksData(drinks);
    }
  };

  useEffect(() => {
    getMealsDrinks();
  }, []);

  const context = {
    fields,
    drinksData,
    mealsData,
    setMealsData,
    setDrinksData,
    showSearch,
    setShowSearch,
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
