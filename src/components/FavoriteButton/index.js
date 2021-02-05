import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { favoriteRecipe, unFavoriteRecipe } from '../../store/ducks/recipes';
import { blackHeartIcon, whiteHeartIcon } from '../../images';
import StyledImage from './styles';

export default function FavoriteButton(props) {
  const [propsState] = useState(props);
  const { recipeId } = propsState;
  const favoriteRecipes = useSelector((state) => state.recipes.favoriteRecipes);
  const detailsRecipe = useSelector((state) => state.recipes.detailsRecipe);
  const dispatch = useDispatch();

  const isFavorite = () => favoriteRecipes.some(({ id }) => id === recipeId);

  const handleClick = () => {
    dispatch(isFavorite() ? unFavoriteRecipe(recipeId) : favoriteRecipe(detailsRecipe));
  };

  return (
    <StyledImage
      src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      onClick={ handleClick }
      alt="Favorite"
      data-testid="favorite-btn"
    />
  );
}
