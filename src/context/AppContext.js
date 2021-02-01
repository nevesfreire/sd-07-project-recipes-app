import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [mealsData, setMealsData] = useState({ meals: null });
  const [drinksData, setDrinksData] = useState({ drinks: null });
  const [inputStatus, setInputStatus] = useState({ searchInput: false });
  return (
    <AppContext.Provider
      value={
        {
          mealsData,
          setMealsData,
          drinksData,
          setDrinksData,
          inputStatus,
          setInputStatus }
      }
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export { AppContext, AppProvider };
