import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../contextAPI/context';
import {
  allDrink,
  allFood,
  fetchApi,
  getDrinksList,
  getFoodList,
  getFoodIngredients,
  getDrinkIngredients,
} from '../services/fetchApi';
// import useRedirect from '../hooks/useRedirect';
// import siteMap from '../helpers/siteMap';

const fetchFirst = async (setState) => {
  const dataFood = await fetchApi(allFood);
  const dataBeverage = await fetchApi(allDrink);
  const categoriesFood = await fetchApi(getFoodList);
  const categoriesBeverage = await fetchApi(getDrinksList);
  setState((s) => ({ ...s,
    isDisabled: true,
    data: {
      food: dataFood.meals,
      beverage: dataBeverage.drinks,
    },
    categories: {
      food: categoriesFood.meals,
      beverage: categoriesBeverage.drinks,
    },
  }));
};

const fetchIngredient = async (pathname, ingredient, setState) => {
  let newData = '';
  if (pathname.match('comidas')) {
    newData = await fetchApi(getFoodIngredients(ingredient));
    setState((s) => ({
      ...s,
      data: { ...s.data, food: newData.meals },
    }
    ));
  }
  if (pathname.match('bebidas')) {
    newData = await fetchApi(getDrinkIngredients(ingredient));
    setState((s) => ({
      ...s,
      data: { ...s.data, beverage: newData.drinks },
    }
    ));
  }
};

// const findMatch = (string, object) => (
//   Object.keys(object).find((key) => key.match(string))
// );

function Provider({ children }) {
  const [login, setLogin] = useState({});
  const [data, setData] = useState({});
  const [detail, setDetail] = useState();
  const [ingredient, setIngredient] = useState('');
  // const [setPath] = useRedirect();
  // const [RecipesUrl, setRecipesUrl] = useState({});
  const [state, setState] = useState({
    header: {
      profileButton: false,
      searchButton: false,
      title: '',
    },
    toggleSearch: false,
    data: { food: [], beverage: [] },
    str: { food: 'strMeal', beverage: 'strDrink' },
    categories: { food: [], beverage: [] },
    filter: '',
    filtered: '',
  });

  useEffect(() => {
    fetchFirst(setState);
    // localStorage.clear();
  }, []);

  useEffect(() => {
    const { filter, pathname } = state;
    if (!filter) {
      if (filter === 'ingredient') {
        fetchIngredient(pathname, ingredient, setState);
      }
      // if (filter === 'nome') {

      // }
    }
  }, [ingredient, state]);

  useEffect(() => {
    const NUM_PASSWORD = 6;
    const { user, passwd } = login;
    if (user && passwd) {
      const emailTest = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(user);
      const passLength = (passwd.length > NUM_PASSWORD);
      if (emailTest && passLength) {
        setState((s) => ({ ...s, user, isDisabled: false }));
      }
      localStorage.setItem('mealsToken', 1);
      localStorage.setItem('cocktailsToken', 1);
    }
  }, [login]);

  const context = {
    detail,
    setDetail,
    data,
    setData,
    state,
    setState,
    login,
    setLogin,
    ingredient,
    setIngredient,
    // HandleTextChange,
    // HandleRadioBtnChange,
    // pathname,
    // setPath,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
