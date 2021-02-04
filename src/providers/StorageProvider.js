import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const StorageContext = createContext();

const StorageProvider = ({ children }) => {
  const [favRecipes, setFavRecipes] = useState([]);
  const verifyLocalFav = localStorage.getItem('favoriteRecipes');

  useEffect(() => {
    if (verifyLocalFav) setFavRecipes(JSON.parse(verifyLocalFav));
  }, [verifyLocalFav]);

  const addFavorite = (recipe, name, id, type) => {
    const recipeObjct = {
      id,
      type,
      area: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory ? recipe.strCategory : '',
      alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
      name: recipe[name],
      image: recipe[`${name}Thumb`],
    };
    const newFavorite = [...favRecipes, recipeObjct];
    setFavRecipes(newFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  };
  const removeFavorite = (recipeId) => {
    const newFavorite = favRecipes.filter(({ id }) => id !== recipeId);
    setFavRecipes(newFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  };

  const context = {
    addFavorite,
    removeFavorite,
  };

  return (
    <StorageContext.Provider value={ context }>
      { children }
    </StorageContext.Provider>
  );
};

export default StorageProvider;

StorageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
