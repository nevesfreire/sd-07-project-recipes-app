import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../contextAPI/context';
import {
  allDrink,
  allFood,
  fetchApi,
  getDrinksList,
  getFoodList,
} from '../services/fetchApi';
// import useRedirect from '../hooks/useRedirect';
// import siteMap from '../helpers/siteMap';

const newFunc = async (setState) => {
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

// const findMatch = (string, object) => (
//   Object.keys(object).find((key) => key.match(string))
// );

function Provider({ children }) {
  const [login, setLogin] = useState({});
  const [data, setData] = useState({});
  const [detail, setDetail] = useState();
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
  });

  function HandleTextChange(event) {
    const { value } = event.target;
    const result = value.toLowerCase();
    setData(
      { ...data, textSeach: result },
    );
  }

  function HandleRadioBtnChange(event) {
    const { value } = event.target;
    setData(
      { ...data, radioBtn: value },
    );
    return value;
  }

  useEffect(() => {
    newFunc(setState);
    // localStorage.clear();
  }, []);

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

  const context = {
    detail,
    setDetail,
    data,
    setData,
    state,
    setState,
    login,
    setLogin,
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
