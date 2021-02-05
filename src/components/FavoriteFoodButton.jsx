import React from 'react';
import PropTypes from 'prop-types';
import { whiteHeartIcon, blackHeartIcon } from '../images';
import { Button } from './Contructors';
import { useLocalStorage } from '../hooks';

export default function FavoriteFoodButton({ foodArr }) {
  const { idMeal, strArea, strMeal, strMealThumb } = foodArr;

  const [favoriteRecipes, setStorage] = useLocalStorage('favoriteRecipes');

  const recipe = {
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: '',
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  const favorite = favoriteRecipes && favoriteRecipes.find(({ id }) => recipe.id === id);

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

FavoriteFoodButton.defaultProps = {
  foodArr: {
    strCategory: '',
  },

};

FavoriteFoodButton.propTypes = {
  foodArr: PropTypes.shape({
    strArea: PropTypes.string,
    idMeal: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }),
};
