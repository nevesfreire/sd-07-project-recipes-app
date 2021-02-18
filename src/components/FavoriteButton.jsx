import React from 'react';
import PropTypes from 'prop-types';
import { whiteHeartIcon, blackHeartIcon } from '../images';
import { Button } from './Contructors';
import { useFavoriteRecipes } from '../hooks';

export default function FavoriteButton({ obj, drink }) {
  const { favorite, setFavorite } = useFavoriteRecipes(obj, drink);
  return (
    <Button
      testid="favorite-btn"
      icon={ favorite ? blackHeartIcon : whiteHeartIcon }
      func={ setFavorite }
    />
  );
}

FavoriteButton.defaultProps = {
  drink: true,
};

FavoriteButton.propTypes = {
  obj: PropTypes.shape({}).isRequired,
  drink: PropTypes.bool,
};
