import React, { /*  useEffect, */ useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { favoriteRecipe, unFavoriteRecipe } from '../../store/ducks/recipes';
import { blackHeartIcon/* , whiteHeartIcon  */ } from '../../images';
// import { resumeMealAndDrinkRecipe } from '../../services/helper';
import StyledImage from './styles';

export default function FavoriteButton(props) {
  const [propsState] = useState(props);
  const { /* recipeId, */ dataTestId } = propsState;
  // const favoriteRecipes = useSelector((state) => state.recipes.favoriteRecipes);
  /* const [isFavorite, setIsFavorite] = useState(favoriteRecipes
    .some(({ id }) => id === recipeId)); */

  // const detailsRecipe = useSelector((state) => state.recipe.data);
  // const dispatch = useDispatch();

  const handleClick = () => {
    /* dispatch(isFavorite
      ? unFavoriteRecipe(recipeId)
      : favoriteRecipe(resumeMealAndDrinkRecipe(detailsRecipe))); */
  };

  /*  useEffect(() => {
    setIsFavorite(favoriteRecipes
      .some(({ id }) => id === recipeId));
  }, [favoriteRecipes, recipeId]); */

  return (
    <StyledImage
      src={ /* isFavorite ? */ blackHeartIcon /* : whiteHeartIcon */ }
      onClick={ handleClick }
      alt="Favorite"
      data-testid={ dataTestId }
    />
  );
}
