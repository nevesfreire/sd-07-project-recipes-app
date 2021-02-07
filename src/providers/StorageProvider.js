import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const StorageContext = createContext();

const StorageProvider = ({ children }) => {
  const [favRecipes, setFavRecipes] = useState([]);
  const [doneRecips, setDoneRecips] = useState([]);
  const verifyLocalFav = localStorage.getItem('favoriteRecipes');
  const verifyLocalDone = localStorage.getItem('doneRecipes');

  useEffect(() => {
    if (verifyLocalFav) setFavRecipes(JSON.parse(verifyLocalFav));
    if (verifyLocalDone) setDoneRecips(JSON.parse(verifyLocalDone));
  }, [verifyLocalFav, verifyLocalDone]);

  const addFavorite = (keyName, recipe, { name, id, type, doneDate, tags }) => {
    if (keyName === 'favoriteRecipes') {
      const recipeObjct = {
        id,
        type,
        area: recipe.strArea ? recipe.strArea : '',
        category: recipe.strCategory ? recipe.strCategory : '',
        alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
        name: recipe[name],
        image: recipe[`${name}Thumb`],
      };
      const newLocalFav = [...favRecipes, recipeObjct];
      setFavRecipes(newLocalFav);
      localStorage.setItem(keyName, JSON.stringify(newLocalFav));
    } else {
      const recipeObjct = {
        id,
        type,
        area: recipe.strArea ? recipe.strArea : '',
        category: recipe.strCategory ? recipe.strCategory : '',
        alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
        name: recipe[name],
        image: recipe[`${name}Thumb`],
        doneDate,
        tags,
      };
      const newLocalDone = [...doneRecips, recipeObjct];
      setDoneRecips(newLocalDone);
      localStorage.setItem(keyName, JSON.stringify(newLocalDone));
    }
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
