import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [btActive, setBtActive] = useState(true);

  const handleChange = ({ target: { value } }, key) => {
    setLogin({ ...login, [key]: value });
  };

  const contextValue = {
    handleChange,
    btActive,
    login,
  };

  useEffect(() => {
    const { email } = login;
    const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const verifyEmail = email.match(regexEmail);
    console.log(email);
    if (verifyEmail) {
      setBtActive(true);
    } else {
      setBtActive(false);
    }
  }, [login]);

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
