import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

function Provider({ children }) {
  const [isFetching, setIsFetching] = useState(false);
  const [api, setApi] = useState('');
  const [results, setResults] = useState([]);
  const [searchByExplore, setSearchByexplore] = useState('');
  const [filterByExplore, setFilterByExplore] = useState('ingrendient');
  const [recipesByExplore, setByExplore] = useState(false);

  const context = {
    api,
    setApi,
    results,
    setResults,
    isFetching,
    setIsFetching,
    searchByExplore,
    setSearchByexplore,
    filterByExplore,
    setFilterByExplore,
    recipesByExplore,
    setByExplore,
  };
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };

export { Context, Provider };
