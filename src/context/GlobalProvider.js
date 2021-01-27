import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import GlobalContext from './GlobalContext';

export default function GlobalProvider({ children }) {
  const history = useHistory();

  const redirect = (path) => {
    history.push({ pathname: path });
  };

  const context = {
    redirect,
  };
  return (
    <GlobalContext.Provider value={ context }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};
