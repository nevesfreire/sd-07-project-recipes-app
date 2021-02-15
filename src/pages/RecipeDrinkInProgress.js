import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../components/components.css';
import {
  Button, LoadingCard, ShareButton, FavoriteDrinkButton, CheckListIngredients, NotFound,
} from '../components';
import { useFetchApi } from '../hooks';
import { getURL } from '../Services';
import './css/recipeInProgress.css';

export default function RecipeDrinkInProgress() {
  const [completRecipe, setComplet] = useState(false);

  const { push } = useHistory();
  const { idDrink } = useParams();

  const URL = getURL({ id: idDrink });
  const [loading, { drinks }] = useFetchApi(URL);
  const [drinkObj] = drinks || [''];
  if (!loading && !drinkObj) return (<NotFound />);

  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>

          <img data-testid="recipe-photo" src={ drinkObj.strDrinkThumb } alt="foto" />

          <div>

            <div>
              <h3 data-testid="recipe-title">{drinkObj.strDrink}</h3>
              <ShareButton />
              <FavoriteDrinkButton drinksArr={ drinkObj } />
            </div>

            <h5 data-testid="recipe-category">{drinkObj.strAlcoholic}</h5>

            <CheckListIngredients
              recipeId={ idDrink }
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
              func={ () => push('/receitas-feitas') }
            />
          </div>
        </div>
      )

  );
}
