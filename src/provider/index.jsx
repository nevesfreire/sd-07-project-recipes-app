import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../contextAPI/context';
import HandleStateChange from './helpers/HandleStateChange';

function Provider({ children }) {
  const [state, setState] = useState({});

  useEffect(() => {
    UseChanges();
  }, [state]);

  const context = {
    state,
    setState,
    HandleStateChange,
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
