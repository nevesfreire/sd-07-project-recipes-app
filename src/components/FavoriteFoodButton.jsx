import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { whiteHeartIcon, blackHeartIcon } from '../images';
import { Button } from './Contructors';
import { useLocalStorage } from '../hooks';

export default function FavoriteFoodButton({ foodArr }) {
  const { idMeal, strArea, strMeal, strMealThumb, strCategory } = foodArr;

  const [favoriteRecipes, setStorage] = useLocalStorage('favoriteRecipes');

  const recipe = {
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  const [favorite, setState] = useState(false);
  useEffect(() => {
    const favorites = favoriteRecipes && favoriteRecipes
      .find(({ id }) => recipe.id === id);
    setState(favorites);
  }, [favoriteRecipes]);

  const setFavorite = () => (
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
      func={ setFavorite }
    />
  );
}

FavoriteFoodButton.defaultProps = {
  foodArr: {
    strCategory: '',
  },

};

FavoriteFoodButton.propTypes = {
  foodArr: PropTypes.shape({
    strCategory: PropTypes.string,
    strArea: PropTypes.string,
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }),
};
