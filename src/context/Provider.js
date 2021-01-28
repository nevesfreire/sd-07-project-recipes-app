import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

function Provider({ children }) {
  const [api, setApi] = useState('meal');
  const context = {
    api,
    setApi,
  };
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };

export { Context, Provider };
