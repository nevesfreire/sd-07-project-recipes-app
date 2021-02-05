import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
// import { LS_KEYS, loadKeyFromLS } from '../../services/localStorage';
import {
  FavoriteButton,
  ShareButton,
  Recomendation,
  RecipeButton,
} from '../../components';
import { mapIngredientsAndMeasuresToList } from '../../services/helper';
import { fetchRecipeById/* , updateFromLS */ } from '../../store/ducks/recipes';

import StyledCard from './styles';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const detailsRecipe = useSelector((state) => state.recipes.detailsRecipe);
  // const doneRecipes = loadKeyFromLS(LS_KEYS.DONE_RECIPES_KEY);
  const [isDone] = useState(false); /* , doneRecipes
    .some(({ id }) => id === recipeId) */

  const inProgressRecipes = useSelector((state) => state.recipes.inProgressRecipes);
  const [isInProgress] = useState(
    Object.prototype.hasOwnProperty.call(inProgressRecipes, recipeId),
  );

  // VERIFICAR ROTA PARA SABER SE É DETALHE OU PROGRESSO

  // OBTER RECEITA PELO ID >> MAPEAR EM DATAILS_RECIPE
  // fetch da receita por ID caso o detalhe no redux não esteja preenchido
  useEffect(() => {
    dispatch(fetchRecipeById(pathname, recipeId));
  }, [dispatch, pathname, recipeId]);

  /* useEffect(() => {
    dispatch(updateFromLS({ [LS_KEYS.DONE_RECIPES_KEY]: doneRecipes }));
  }, [dispatch, doneRecipes]); */

  // VERIFICAR SE RECEITA É FAVORITA
  // MAPEIA DO REDUX >> favoriteRecipes
  // VERIFICA SE O ARRAY TEM UM OBJETO COM O ID DA RECEITA, SE SIM, SALVA NO ESTADO

  // VERIFICAR SE RECEITA ESTÁ EM PROGRESSO
  // MAPEIA DO REDUX >> inProgressRecipes
  // SE FOR COMIDA >> inProgressRecipes.meals[recipeId]
  // SE FOR COMIDA >> inProgressRecipes.meals[recipeId]
  // SE ESTIVER EM PROGRESSO - COMPARAR INGREDIENTES

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
          <FavoriteButton recipeId={ recipeId } />
          <ShareButton
            data-testid="favorite-btn"
            recipeId={ recipeId }
            type={ pathname.includes('comidas') ? 'comidas' : 'bebidas' }
          />
          <StyledCard.Text data-testid="recipe-category">
            {detailsRecipe.type === 'meal'
              ? detailsRecipe.category : detailsRecipe.alcoholicOrNot}
          </StyledCard.Text>
        </StyledCard.Body>
        <StyledCard.Body>
          <h4>Ingredients:</h4>
          <ul>
            {
              mapIngredientsAndMeasuresToList(detailsRecipe).map(({ text }, index) => (
                <li
                  key={ text }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {text}
                </li>
              ))
            }
          </ul>
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
        <StyledCard.Body>
          <Recomendation />
        </StyledCard.Body>
      </StyledCard>
      {!isDone
      && <RecipeButton
        title={ isInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
        path={ pathname }
      /> }
    </>
  );
};

export default RecipeDetails;
