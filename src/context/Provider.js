import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

function Provider({ children }) {
  const context = {};
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };

export { Context, Provider };
