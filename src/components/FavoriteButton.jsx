import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { whiteHeartIcon, blackHeartIcon } from '../images';
import { Button } from './Contructors';
import { useFavoriteRecipes } from '../hooks';

export default function FavoriteButton({ drink, id: idOptional }) {
  const id = useParams().id || idOptional;
  const { favorite, setFavorite } = useFavoriteRecipes(id, drink);
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
  id: '',
};

FavoriteButton.propTypes = {
  drink: PropTypes.bool,
  id: PropTypes.string,
};
