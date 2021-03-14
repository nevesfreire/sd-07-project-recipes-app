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
  const oneMinute = 60;
  const threeSeconds = 0.05;
  const initial = false;
  const [login, setLogin] = useState({});
  // const [data, setData] = useState({
  //   radioBtn: '',
  //   textSeach: '',
  //   filterByName: [],
  //   filterByFirstchar: [],
  //   filterByIngredient: [],
  // });
  const [detail, setDetail] = useState();
  const [ingredient, setIngredient] = useState('');
  const [search, setSearch] = useState(initial);

  const [active, setActive] = useState(false);
  const [time, setTime] = useState(threeSeconds * oneMinute);
  const [hasFinished, setHasFinished] = useState(false);

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
    radioBtn: '',
    textSeach: '',
    filterByName: [],
    filterByFirstchar: [],
    filterByIngredient: [],
  });

  console.log('o tempo está acabando: ', active, time);

  const { filterByIngredient, filterByName, filterByFirstchar } = state;
  console.log('estou no provider aqui', filterByIngredient);
  console.log(filterByName);
  console.log('estou no provider', filterByFirstchar);

  function HandleTextChange(event) {
    const { value } = event.target;
    const result = value.toLowerCase();
    setState(
      { ...state, textSeach: result },
    );
  }

  function HandleRadioBtnChange(event) {
    const { value } = event.target;
    setState(
      { ...state, radioBtn: value },
    );
    return value;
  }

  useEffect(() => {
    fetchFirst(setState);
  }, []);

  useEffect(() => {
    const { filter, pathname } = state;
    if (!filter && filter === 'ingredient') {
      fetchIngredient(pathname, ingredient, setState);
    }
    // if (filter === 'nome') {

    // }
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

  // useEffect(() => {
  //   if (RecipesUrl !== '') {
  //     fetchApi(RecipesUrl)
  //       .then((r) => setState((s) => ({ ...s, data: r })));
  //   }
  // }, [RecipesUrl]);

  // useEffect(() => {
  //   const newHeader = siteMap[findMatch(pathname.split('/')[1], siteMap)].header;
  //   setState((s) => ({ ...s, header: newHeader }));
  // }, [pathname, setState]);
  const changeClick = ((change) => setSearch({ change }));

  const context = {
    setSearch,
    search,
    changeClick,
    detail,
    setDetail,
    active,
    setActive,
    time,
    hasFinished,
    setTime,
    // data,
    // setData,
    setHasFinished,
    state,
    setState,
    login,
    setLogin,
    ingredient,
    setIngredient,
    HandleTextChange,
    HandleRadioBtnChange,
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
