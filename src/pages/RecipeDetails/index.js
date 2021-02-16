import React, { useEffect, /* , useState */
  useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
import { fetchRecipeById } from '../../store/ducks/recipe';

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
  const { data: recipe, isFetching } = useSelector((state) => state.recipe);
  const [favoriteRecipes,
    setFavoriteRecipes] = useLocalStorage(LS_KEYS.FAVORITE_RECIPES_KEY, []);
  const [doneRecipes] = useLocalStorage(LS_KEYS.DONE_RECIPES_KEY, []);
  const [inProgressRecipes] = useLocalStorage(LS_KEYS.IN_PROGRESS_RECIPES_KEY, {
    cocktails: {}, meals: {},
  });

  const isDone = () => doneRecipes
    && doneRecipes.some(({ id }) => id === recipe.id);

  useEffect(() => {
    dispatch(fetchRecipeById(pathname, recipeId));
    setIsPageInProgress(pathname.includes(PATH_IS_IN_PROGRESS));
  }, [dispatch, pathname, recipeId]);

  const handleAllIsDone = (allIsDone) => setIsAllDone(allIsDone);

  return (
    <div>
      { isFetching ? (<span> Loading... </span>)
        : (recipe
          && (
            <div>
              <StyledCard>
                <StyledCard.Img
                  variant="top"
                  src={ recipe.image }
                  data-testid="recipe-photo"
                />
                <StyledCard.Body>
                  <StyledCard.Title data-testid="recipe-title">
                    {recipe.name}
                  </StyledCard.Title>
                  <FavoriteButton
                    recipe={ recipe }
                    dataTestId="favorite-btn"
                    favoriteRecipes={ favoriteRecipes }
                    setFavoriteRecipes={ setFavoriteRecipes }
                  />
                  <ShareButton
                    dataTestId="share-btn"
                    recipeId={ recipeId }
                    type={ pathname.includes('comidas') ? 'comidas' : 'bebidas' }
                  />
                  <StyledCard.Text data-testid="recipe-category">
                    {recipe.type === 'comida'
                      ? recipe.category : recipe.alcoholicOrNot}
                  </StyledCard.Text>
                </StyledCard.Body>
                <StyledCard.Body>
                  <RecipeIngredients
                    ingredients={ mapIngredientsAndMeasuresToList(recipe) }
                    isInProgress={ isPageInProgress }
                    handleIngredients={ handleAllIsDone }
                  />
                </StyledCard.Body>
                <StyledCard.Body>
                  <StyledCard.Text data-testid="instructions">
                    {recipe.strInstructions}
                  </StyledCard.Text>
                </StyledCard.Body>
                { pathname.includes('comidas')
                && (
                  <StyledCard.Body>
                    <iframe
                      data-testid="video"
                      className="width360"
                      title="video"
                      src={ recipe.strYoutube
                        && recipe.strYoutube.replace('watch?v=', 'embed/') }
                      frameBorder="0"
                      allow="accelerometer; autoplay;
                          clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
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
                title={ getButtonName(pathname, inProgressRecipes, recipe.id) }
                path={ pathname }
                isDisabled={ pathname.includes(PATH_IS_IN_PROGRESS) && !isAllDone }
              /> }
            </div>)
        )}
    </div>

  );
};

export default RecipeDetails;
