import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [url, setUrl] = useState('');
  const [searching, setSearching] = useState(false);

  const handleEntrarButton = () => {
    localStorage.clear();
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const handleUrlChange = () => {
    setUrl(window.location.href);
  };

  const handleSearchButton = (e) => {
    if (e) {
      switch (searching) {
      case true:
        return setSearching(false);
      default:
        return setSearching(true);
      }
    }
  };

  return (
    <RecipesContext.Provider
      value={
        {
          setEmail,
          setSenha,
          handleEntrarButton,
          email,
          senha,
          url,
          handleSearchButton,
          handleUrlChange,
          searching }
      }
    >
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default Provider;
