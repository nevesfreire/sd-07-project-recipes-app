import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

function Provider({ children }) {
  const [isFetching, setIsFetching] = useState(false);
  const [api, setApi] = useState('meal');
  const [results, setResults] = useState([]);
  const context = {
    api,
    setApi,
    results,
    setResults,
    isFetching,
    setIsFetching,
  };
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };

export { Context, Provider };
