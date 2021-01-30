import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const zero = 0;
  const [login, setLogin] = useState({ email: '', password: '' });
  const [foodDetail, setFoodDetail] = useState([]);
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [id, setId] = useState(zero);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };
  const context = {
    login,
    setLogin,
    foodDetail,
    setFoodDetail,
    drinkDetail,
    setDrinkDetail,
    id,
    setId,
    ingredients,
    setIngredients,
    showSearchBar,
    toggleSearchBar,
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
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default RecipesProvider;
