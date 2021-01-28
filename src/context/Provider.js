import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import FoodAppContext from './FoodAppContext';
import { mealsAPI, drinksAPI } from '../services';

function Provider({ children }) {
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [renderize, setRenderize] = useState(false);
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

  const handlerData = (recipes, history, id) => {
    if (!recipes) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      setRenderize(false);
    } else if (recipes.length > 1) {
      setRenderize(true);
    } else {
      const { location: { pathname } } = history;
      history.push(`${pathname}/${recipes[0][id]}`);
    }
  };

  const handlerClick = async ({ target }, { history }) => {
    const { value } = target;
    const { term, type } = fields;
    if (value === 'Comidas') {
      const { meals } = await mealsAPI(term, type);
      setMealsData(meals);
      handlerData(meals, history, 'idMeal');
    } else {
      const { drinks } = await drinksAPI(term, type);
      setDrinksData(drinks);
      handlerData(drinks, history, 'idDrink');
    }
  };

  useEffect(() => {
    getMealsDrinks();
  }, []);

  const context = {
    renderize,
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
