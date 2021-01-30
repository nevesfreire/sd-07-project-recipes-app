import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import FoodAppContext from './FoodAppContext';
import { mealsAPI, drinksAPI, detailApi } from '../services';

function Provider({ children }) {
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [fields, setFields] = useState({ term: '', type: '' });
  const [detailRecipe, setDetailRecipe] = useState({});

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
    if (!recipes) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (recipes.length === 1) {
      const { path } = match;
      history.push(`${path}/${recipes[0][id]}`);
    }
  };

  const handlerClick = async ({ target }, { match, history }) => {
    const { value } = target;
    const { term, type } = fields;
    if (value === 'Comidas') {
      const { meals } = await mealsAPI(term, type);
      setMealsData(meals);
      handlerData(meals, match, history, 'idMeal');
    } else if (value === 'Bebidas') {
      const { drinks } = await drinksAPI(term, type);
      setDrinksData(drinks);
      handlerData(drinks, match, history, 'idDrink');
    }
  };

  const handleClickDetail = async ([_vazia, pathname, id]) => {
    const detail = await detailApi(id, pathname);

    setDetailRecipe(detail);
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
    handleClickDetail,
    detailRecipe,
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
