import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../components/components.css';
import { Button, LoadingCard, ShareButton,
  FavoriteButton, CheckListIngredients, NotFound,
} from '../components';
import { useFetchApi, useDoneRecipes } from '../hooks';
import { getURL } from '../Services';
import './css/recipeInProgress.css';

export default function RecipeDrinkInProgress() {
  const [completRecipe, setComplet] = useState(false);

  const { setNewRecipe } = useDoneRecipes();

  const { push } = useHistory();
  const { id } = useParams();

  const URL = getURL({ id });
  const [loading, { drinks }] = useFetchApi(URL);
  const [drinkObj] = drinks || [''];

  if (!loading && !drinkObj) return (<NotFound />);

  const location = window.location.href.replace('/in-progress', '');

  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>

          <img data-testid="recipe-photo" src={ drinkObj.strDrinkThumb } alt="foto" />

          <div>

            <div>
              <h3 data-testid="recipe-title">{drinkObj.strDrink}</h3>
              <ShareButton URL={ location } />
              <FavoriteButton drink />
            </div>

            <h5 data-testid="recipe-category">{drinkObj.strAlcoholic}</h5>

            <CheckListIngredients
              recipeId={ id }
              setComplet={ setComplet }
              ingreObj={ drinkObj }
            />

            <div>
              <h4>Instruções</h4>
              <p data-testid="instructions">
                {drinkObj.strInstructions}
              </p>
            </div>

            <Button
              testid="finish-recipe-btn"
              text="Finalizar receita"
              disabled={ !completRecipe }
              func={ () => {
                const drink = true;
                setNewRecipe(drinkObj, drink);
                push('/receitas-feitas');
              } }
            />
          </div>
        </div>
      )

  );
}
