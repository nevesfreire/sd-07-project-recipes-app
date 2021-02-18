import React from 'react';
import PropTypes from 'prop-types';
import { whiteHeartIcon, blackHeartIcon } from '../images';
import { Button } from './Contructors';
import { useFavoriteRecipes } from '../hooks';

export default function FavoriteFoodButton({ arr, drink }) {
  const { favorite, setFavorite } = useFavoriteRecipes(arr, drink);
  return (
    <Button
      testid="favorite-btn"
      icon={ favorite ? blackHeartIcon : whiteHeartIcon }
      func={ setFavorite }
    />
  );
}

FavoriteFoodButton.defaultProps = {
  drink: true,
};

FavoriteFoodButton.propTypes = {
  arr: PropTypes.arrayOf.isRequired,
  drink: PropTypes.shape({}),
};
