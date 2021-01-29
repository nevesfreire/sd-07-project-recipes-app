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

  const handlerData = async (recipes, match, history, id) => {
    if (document.querySelectorAll('.div-meals').length === 1) {
      const { path } = match;
      history.push(`${path}/${recipes[0][id]}`);
    } else if (document.querySelectorAll('.div-meals').length < 1) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  const handlerClick = async ({ target }, { match, history }) => {
    const { value } = target;
    const { term, type } = fields;
    if (value === 'Comidas') {
      const { meals } = await mealsAPI(term, type);
      if (meals === null || meals === undefined) {
        setMealsData([]);
      } else {
        setMealsData(meals);
      }
      handlerData(mealsData, match, history, 'idMeal');
    } else if (value === 'Bebidas') {
      const { drinks } = await drinksAPI(term, type);
      if (drinks === null || drinks === undefined) {
        setDrinksData([]);
      } else {
        setDrinksData(drinks);
      }
      handlerData(drinksData, match, history, 'idDrink');
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
    handlerData,
  };

  return (
    <FoodAppContext.Provider value={ context }>
      { children}
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
