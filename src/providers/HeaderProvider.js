import React, { useState } from 'react';
import propTypes from 'prop-types';
import RecipesContext from './Context/Context';

const HeaderProvider = ({ children }) => {
  const [tittleHeader, setTittleHeader] = useState('Comidas');
  const [searchBar, setSearchBar] = useState(false);

  const changeSearchBarState = () => {
    if (searchBar === true) setSearchBar(false);
    if (searchBar === false) setSearchBar(true);
  };

  const context = {
    tittleHeader,
    setTittleHeader,
    searchBar,
    changeSearchBarState,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
};

HeaderProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default HeaderProvider;
