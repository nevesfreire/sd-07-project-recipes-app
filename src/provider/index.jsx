import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../contextAPI/context';
import { fetchApi } from '../services/fetchApi';
// import siteMap from '../helpers/siteMap';

// const findMatch = (string, object) => (
//   Object.keys(object).find((key) => key.match(string))
// );

function Provider({ children }) {
  const [login, setLogin] = useState({});
  const [state, setState] = useState({ toggleSearch: false });
  const [RecipesUrl, setRecipesUrl] = useState({});
  // const { history } = props;
  // const { location: { pathname } } = history;

  useEffect(() => {
    setState((s) => ({ ...s, isDisabled: true }));
    localStorage.clear();
  }, []);

  useEffect(() => {
    const NUM_PASSWORD = 6;
    const { user, passwd } = login;
    if (user && passwd) {
      const emailTest = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(user);
      const passLength = (passwd.length > NUM_PASSWORD);
      if (emailTest && passLength) {
        setState((s) => ({ ...s, user, passwd, isDisabled: false }));
      }
      localStorage.setItem('mealsToken', JSON.stringify(1));
      localStorage.setItem('cocktailsToken', JSON.stringify(1));
    }
  }, [login]);

  useEffect(() => {
    if (RecipesUrl !== '') {
      fetchApi(RecipesUrl)
        .then((r) => setState((s) => ({ ...s, data: r })));
    }
  }, [RecipesUrl]);

  // useEffect(() => {
  //   findMatch(pathname, siteMap)

  // }, [pathname])

  const context = {
    state,
    setState,
    login,
    setLogin,
    setRecipesUrl,
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
