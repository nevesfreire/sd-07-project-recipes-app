import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import CupNodesContext from './CupNodesContext';
import { userReducer, filterReducer } from '../reducers';

const initialStateUser = { user: { email: '' } };
const initialStateFilter = {
  search: { text: '', option: '', title: '' },
  category: '',
  area: '',
};

export default function Provider({ children }) {
  const [userDates, dispatchUser] = useReducer(userReducer, initialStateUser);
  const [filterDates, dispatchFilter] = useReducer(filterReducer, initialStateFilter);

  const values = {
    dispatchUser,
    dispatchFilter,
    userDates,
    filterDates,
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
