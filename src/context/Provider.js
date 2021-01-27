import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  // const retrieveEmail = () => {
  // const storageEmail = JSON.parse(localStorage.getItem('user'));
  // return storageEmail === undefined ? '' : storageEmail.email;
  // };

  const [userEmail, setUserEmail] = useState('');

  const context = {
    userEmail,
    setUserEmail,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
