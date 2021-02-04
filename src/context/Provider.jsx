import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CoffeAndCodeContext from './CoffeeAndCodeContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cardFood, setCardFood] = useState([]);
  const [cardDrink, setCardDrink] = useState([]);
  const [categoriesButtonDrink, setCategoriesButtonDrink] = useState([]);
  const [categoriesButtonFood, setCategoriesButtonFood] = useState([]);
  const [ingredientsAndMeasures, setIngredientsAndMeasures] = useState([]);

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
    setCardFood,
    setCardDrink,
    cardFood,
    cardDrink,
    categoriesButtonDrink,
    categoriesButtonFood,
    setCategoriesButtonDrink,
    setCategoriesButtonFood,
    ingredientsAndMeasures,
    setIngredientsAndMeasures,
  };

  return (
    <CoffeAndCodeContext.Provider value={ contextValue }>
      { children }
    </CoffeAndCodeContext.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };

export default Provider;
