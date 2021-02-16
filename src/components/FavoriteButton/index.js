import React, { useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LS_KEYS } from '../../services/localStorage';
import { blackHeartIcon, whiteHeartIcon } from '../../images';
import { resumeMealAndDrinkRecipe } from '../../services/helper';
import StyledImage from './styles';

export default function FavoriteButton(props) {
  const [propsState] = useState(props);
  const { recipe, dataTestId } = propsState;
  const [favoriteRecipes,
    setFavoriteRecipes] = useLocalStorage(LS_KEYS.FAVORITE_RECIPES_KEY, []);
  const [isFavorite, setIsFavorite] = useState(favoriteRecipes
    .some(({ id }) => id === recipe.id));

  const handleClick = () => {
    setFavoriteRecipes(isFavorite
      ? [...favoriteRecipes]
        .filter(({ id }) => id !== recipe.id)
      : [...favoriteRecipes, resumeMealAndDrinkRecipe(recipe)]);
  };

  useEffect(() => {
    setIsFavorite(favoriteRecipes
      .some(({ id }) => id === recipe.id));
  }, [favoriteRecipes, recipe]);

  return (
    <StyledImage
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      onClick={ handleClick }
      alt="Favorite"
      data-testid={ dataTestId }
    />
  );
}
