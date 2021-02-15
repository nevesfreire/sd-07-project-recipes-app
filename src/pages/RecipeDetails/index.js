import React, { useEffect, /* , useState */
  useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import { LS_KEYS } from '../../services/localStorage';
import useLocalStorage from '../../hooks/useLocalStorage';

import {
  FavoriteButton,
  ShareButton,
  Recomendation,
  RecipeButton,
  RecipeIngredients,
} from '../../components';
import { mapIngredientsAndMeasuresToList } from '../../services/helper';
import { fetchRecipeById/* , updateFromLS */ } from '../../store/ducks/recipes';

import StyledCard from './styles';

const PATH_IS_IN_PROGRESS = 'in-progress';

const isInProgress = (pathname, inProgressRecipes, id) => inProgressRecipes && Object
  .prototype.hasOwnProperty.call(inProgressRecipes[
    pathname.includes('comida') ? 'meals' : 'cocktails'
  ], id);

const getButtonName = (pathname, inProgressRecipes, id) => {
  if (!pathname.includes(PATH_IS_IN_PROGRESS)) {
    return isInProgress(pathname, inProgressRecipes, id)
      ? 'Continuar Receita'
      : 'Iniciar Receita';
  }
  return 'Finalizar Receita';
};

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [isPageInProgress, setIsPageInProgress] = useState(false);
  const [isAllDone, setIsAllDone] = useState(false);
  const detailsRecipe = useSelector((state) => state.recipes.detailsRecipe);
  const [doneRecipes] = useLocalStorage(LS_KEYS.DONE_RECIPES_KEY, []);
  const [inProgressRecipes] = useLocalStorage(LS_KEYS.IN_PROGRESS_RECIPES_KEY, {
    cocktails: {}, meals: {},
  });

  const isDone = () => doneRecipes
    && doneRecipes.some(({ id }) => id === detailsRecipe.id);

  useEffect(() => {
    dispatch(fetchRecipeById(pathname, recipeId));
    setIsPageInProgress(pathname.includes(PATH_IS_IN_PROGRESS));
  }, [dispatch, pathname, recipeId]);

  /* useEffect(() => {
    if (doneRecipes) {
      dispatch(updateFromLS({ [LS_KEYS.DONE_RECIPES_KEY]: doneRecipes }));
    }
  }, [dispatch, doneRecipes]); */

  /* useEffect(() => {
    if (inProgressRecipes) {
      dispatch(updateFromLS({ [LS_KEYS.IN_PROGRESS_RECIPES_KEY]: inProgressRecipes }));
    }
  }, [dispatch, inProgressRecipes]); */

  const handleAllIsDone = (allIsDone) => setIsAllDone(allIsDone);

  return (
    <>
      <StyledCard>
        <StyledCard.Img
          variant="top"
          src={ detailsRecipe.image }
          data-testid="recipe-photo"
        />
        <StyledCard.Body>
          <StyledCard.Title data-testid="recipe-title">
            {detailsRecipe.name}
          </StyledCard.Title>
          <FavoriteButton
            recipeId={ recipeId }
            dataTestId="favorite-btn"
          />
          <ShareButton
            dataTestId="share-btn"
            recipeId={ recipeId }
            type={ pathname.includes('comidas') ? 'comidas' : 'bebidas' }
          />
          <StyledCard.Text data-testid="recipe-category">
            {detailsRecipe.type === 'comida'
              ? detailsRecipe.category : detailsRecipe.alcoholicOrNot}
          </StyledCard.Text>
        </StyledCard.Body>
        <StyledCard.Body>
          <RecipeIngredients
            ingredients={ mapIngredientsAndMeasuresToList(detailsRecipe) }
            isInProgress={ isPageInProgress }
            handleIngredients={ handleAllIsDone }
          />
        </StyledCard.Body>
        <StyledCard.Body>
          <StyledCard.Text data-testid="instructions">
            {detailsRecipe.strInstructions}
          </StyledCard.Text>
        </StyledCard.Body>
        { pathname.includes('comidas')
          && (
            <StyledCard.Body>
              <ReactPlayer
                data-testid="video"
                width="318px"
                url={ detailsRecipe.strYoutube }
              />
            </StyledCard.Body>)}
        {!isPageInProgress
        && (
          <StyledCard.Body>
            <Recomendation />
          </StyledCard.Body>
        )}
      </StyledCard>
      {!isDone()
      && <RecipeButton
        title={ getButtonName(pathname, inProgressRecipes, detailsRecipe.id) }
        path={ pathname }
        isDisabled={ pathname.includes(PATH_IS_IN_PROGRESS) && !isAllDone }
      /> }
    </>
  );
};

export default RecipeDetails;
