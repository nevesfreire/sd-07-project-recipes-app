import React, { createContext, useState } from 'react';
import propTypes from 'prop-types';

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
//   const [isFavorite, setIsFavorite] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [recommended, setRecommended] = useState([]);
//   const [show, setShow] = useState(false);

  const foodsFetched = [];

  const context = {
    // isFavorite,
    // setIsFavorite,
    foodsFetched,
    recipe,
    setRecipe,
    recommended,
    setRecommended,
    // show,
    // setShow,
  };

  return (
    <RecipeContext.Provider value={ context }>
      { children }
    </RecipeContext.Provider>
  );
};

export { RecipeContext, RecipeProvider as Provider };

RecipeProvider.propTypes = {
  children: propTypes.objectOf(),
}.isRequired;