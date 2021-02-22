import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../components/components.css';
import { Button, LoadingCard, ShareButton, FavoriteButton,
  CheckListIngredients, NotFound,
} from '../components';
import { useFetchApi, useDoneRecipes } from '../hooks';
import { getURL } from '../Services';
import './css/recipeInProgress.css';

export default function RecipeFoodInProgress() {
  const [completRecipe, setComplet] = useState(false);

  const { setNewRecipe } = useDoneRecipes();

  const { push } = useHistory();
  const { id } = useParams();

  const URL = getURL({ id }, false);
  const [loading, { meals }] = useFetchApi(URL);
  const [mealsObj] = meals || [''];

  if (!loading && !mealsObj) return (<NotFound />);

  const location = window.location.href.replace('/in-progress', '');

  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>

          <img data-testid="recipe-photo" src={ mealsObj.strMealThumb } alt="foto" />

          <div>

            <div>
              <h3 data-testid="recipe-title">{mealsObj.strMeal}</h3>
              <ShareButton URL={ location } data-testid="share-btn" />
              <FavoriteButton drink={ false } data-testid="favorite-btn" />
            </div>

            <h5 data-testid="recipe-category">{mealsObj.strCategory}</h5>

            <CheckListIngredients
              recipeId={ id }
              drink={ false }
              setComplet={ setComplet }
              ingreObj={ mealsObj }
            />

            <div>
              <h4>Instruções</h4>
              <p data-testid="instructions">
                {mealsObj.strInstructions}
              </p>
            </div>

            <Button
              testid="finish-recipe-btn"
              text="Finalizar receita"
              disabled={ !completRecipe }
              func={ () => {
                const drink = false;
                setNewRecipe(mealsObj, drink);
                push('/receitas-feitas');
              } }
            />
          </div>
        </div>
      )

  );
}
