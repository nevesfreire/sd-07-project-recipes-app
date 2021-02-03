import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../contextAPI/context';

function Provider({ children }) {
  const [login, setLogin] = useState({});
  const [state, setState] = useState({});

  useEffect(() => {
    setState((s) => ({ ...s, isDisabled: true }));
  }, []);

  useEffect(() => {
    const NUM_PASSWORD = 5;
    const { user, passwd } = login;
    if (user && passwd) {
      const emailTest = (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(user);
      const passLength = (passwd.length > NUM_PASSWORD);
      if (emailTest && passLength) {
        setState((s) => ({ ...s, user, passwd, isDisabled: false }));
      }
    }
  }, [login]);

  const context = {
    state,
    setState,
    login,
    setLogin,
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
