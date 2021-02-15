import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../components/components.css';
import {
  Button, LoadingCard, ShareButton, FavoriteFoodButton, CheckListIngredients, NotFound,
} from '../components';
import { useFetchApi } from '../hooks';
import { getURL } from '../Services';
import './css/recipeInProgress.css';

export default function RecipeFoodInProgress() {
  const [completRecipe, setComplet] = useState(false);

  const { push } = useHistory();
  const { idFood } = useParams();

  const drink = false;
  const URL = getURL({ id: idFood }, drink);
  const [loading, { meals }] = useFetchApi(URL);
  const [mealsObj] = meals || [''];

  if (!loading && !mealsObj) return (<NotFound />);

  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>

          <img data-testid="recipe-photo" src={ mealsObj.strMealThumb } alt="foto" />

          <div>

            <div>
              <h3 data-testid="recipe-title">{mealsObj.strMeal}</h3>
              <ShareButton />
              <FavoriteFoodButton foodArr={ mealsObj } />
            </div>

            <h5 data-testid="recipe-category">{mealsObj.strCategory}</h5>

            <CheckListIngredients
              recipeId={ idFood }
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
              func={ () => push('/receitas-feitas') }
            />
          </div>
        </div>
      )

  );
}
