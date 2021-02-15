import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { whiteHeartIcon, blackHeartIcon } from '../images';
import { Button } from './Contructors';
import { useLocalStorage } from '../hooks';

export default function FavoriteDrinkButton({ drinksArr }) {
  const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = drinksArr;
  const [favoriteRecipes, setStorage] = useLocalStorage('favoriteRecipes');

  const recipe = {
    id: idDrink,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  const [favorite, setState] = useState(false);
  useEffect(() => {
    const favorites = favoriteRecipes && favoriteRecipes
      .find(({ id }) => recipe.id === id);
    setState(favorites);
  }, [favoriteRecipes, recipe.id]);

  const setFavirite = () => (
    favoriteRecipes
      ? setStorage(
        favorite
          ? [
            ...favoriteRecipes.filter(({ id }) => id !== recipe.id),
          ]
          : [...favoriteRecipes, recipe],
      )
      : setStorage([recipe])
  );

  return (
    <Button
      testid="favorite-btn"
      icon={ favorite ? blackHeartIcon : whiteHeartIcon }
      func={ setFavirite }
    />
  );
}

FavoriteDrinkButton.defaultProps = {
  drinksArr: {
    strCategory: '',
    strAlcoholic: '',
  },

};

FavoriteDrinkButton.propTypes = {
  drinksArr: PropTypes.shape({
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    idDrink: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
  }),
};
