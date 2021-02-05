import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import getMeals from '../services/mealAPI';
import getDrinks from '../services/cockTailAPI';

function Provider({ children }) {
  const [control, setControl] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const fetchMeals = async (type, value, controlVar) => {
    const result = await getMeals(type, value);
    setRecipes(result);
    if (controlVar) setFilteredRecipes(result);
    if (!controlVar) {
      return null;
    }
    const resultReturn = {
      result,
      redirect: false,
    };
    if (result.meals === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (result.meals.length === 1) {
      resultReturn.redirect = true;
      setControl(true);
      return resultReturn;
    }
    setControl(true);
    return resultReturn;
  };

  const fetchDrinks = async (type, value, controlVar) => {
    const result = await getDrinks(type, value);
    setRecipes(result);
    if (controlVar) setFilteredRecipes(result);
    if (!controlVar) {
      return null;
    }
    const resultReturn = {
      result,
      redirect: false,
    };
    if (result.drinks === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (result.drinks.length === 1) {
      resultReturn.redirect = true;
      setControl(true);
      return resultReturn;
    }
    setControl(true);
    return resultReturn;
  };

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [btActive, setBtActive] = useState(true);

  const handleChange = ({ target: { value } }, key) => {
    setLogin({ ...login, [key]: value });
  };

  useEffect(() => {
    const { email } = login;
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const verifyEmail = email.match(regexEmail);
    if (verifyEmail) {
      setBtActive(true);
    } else {
      setBtActive(false);
    }
  }, [login]);

  const contextValue = {
    control,
    setControl,
    recipes,
    setRecipes,
    fetchMeals,
    fetchDrinks,
    handleChange,
    btActive,
    login,
    filteredRecipes,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
