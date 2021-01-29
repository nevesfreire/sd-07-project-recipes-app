import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [mealsData, setMealsData] = useState({ meals: null });
  const [drinksData, setDrinksData] = useState({ drinks: null });
  return (
    <AppContext.Provider value={ { mealsData, setMealsData, drinksData, setDrinksData } }>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export { AppContext, AppProvider };
