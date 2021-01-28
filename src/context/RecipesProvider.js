import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [foodDetail, setFoodDetail] = useState([]);
  const [drinkDetail, setDrinkDetail] = useState([]);

  const context = {
    login,
    setLogin,
    foodDetail,
    setFoodDetail,
    drinkDetail,
    setDrinkDetail,
  };

  return (
    <div>
      <RecipesContext.Provider value={ context }>
        {children}
      </RecipesContext.Provider>
    </div>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default RecipesProvider;
