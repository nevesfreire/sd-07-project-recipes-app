import React, { useEffect, useState } from 'react';
import { blackHeartIcon, whiteHeartIcon } from '../../images';
import { resumeMealAndDrinkRecipe } from '../../services/helper';
import StyledImage from './styles';

export default function FavoriteButton(props) {
  const [propsState, setPropsState] = useState(props);
  const { recipe, dataTestId, favoriteRecipes, setFavoriteRecipes } = propsState;

  const [isFavorite, setIsFavorite] = useState(favoriteRecipes
    .some(({ id }) => id === recipe.id));

  const handleClick = () => {
    setFavoriteRecipes(isFavorite
      ? favoriteRecipes
        .filter(({ id }) => id !== recipe.id)
      : [...favoriteRecipes, resumeMealAndDrinkRecipe(recipe)]);
  };

  useEffect(() => setPropsState(props), [props]);

  useEffect(() => {
    setIsFavorite(favoriteRecipes
      .some(({ id }) => id === recipe.id));
  }, [favoriteRecipes, recipe.id]);

  return (
    <StyledImage
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      onClick={ handleClick }
      alt="Favorite"
      data-testid={ dataTestId }
    />
  );
}
