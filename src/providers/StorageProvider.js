import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const StorageContext = createContext();

const StorageProvider = ({ children }) => {
  const [favRecipes, setFavRecipes] = useState([]);
  const verifyLocalFav = localStorage.getItem('favoriteRecipes');

  useEffect(() => {
    if (verifyLocalFav) setFavRecipes(JSON.parse(verifyLocalFav));
  }, [verifyLocalFav]);

  const addFavorite = (keyName, recipe, { name, id, type, doneDate, tags }) => {
    const [objetct, setObject ] = useState({};)
    if (keyName === 'favoriteRecipes') {
      setObject({
          id,
          type,
          area: recipe.strArea ? recipe.strArea : '',
          category: recipe.strCategory ? recipe.strCategory : '',
          alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
          name: recipe[name],
          image: recipe[`${name}Thumb`],
      });
    } else {
      setObject({
          id,
          type,
          area: recipe.strArea ? recipe.strArea : '',
          category: recipe.strCategory ? recipe.strCategory : '',
          alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
          name: recipe[name],
          image: recipe[`${name}Thumb`],
          doneDate,
          tags,
      });
    }

    const newFavorite = [...favRecipes, objetct];
    setFavRecipes(newFavorite);
    localStorage.setItem(keyName, JSON.stringify(newFavorite));
  };
  const removeFavorite = (keyName, recipeId) => {
    const newFavorite = favRecipes.filter(({ id }) => id !== recipeId);
    setFavRecipes(newFavorite);
    localStorage.setItem(keyName, JSON.stringify(newFavorite));
  };

  const context = {
    addFavorite,
    removeFavorite,
  };

  return (
    <StorageContext.Provider value={ context }>
      {children}
    </StorageContext.Provider>
  );
};

export default StorageProvider;

StorageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
