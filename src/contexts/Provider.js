import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import CupNodesContext from './CupNodesContext';
import { userReducer } from '../reducers/userReducer';

const initialStateReducer = { user: { email: '' } };

export default function Provider({ children }) {
  const [userDates, dispatchUser] = useReducer(userReducer, initialStateReducer);

  const values = {
    dispatchUser,
    userDates,
  };

  return (
    <CupNodesContext.Provider value={ { ...values } }>
      {children}
    </CupNodesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape(PropTypes.element.isRequired).isRequired,
};
