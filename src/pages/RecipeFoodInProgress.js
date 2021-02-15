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

  if (!loading && !meals) return (<NotFound />);

  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>

          <img data-testid="recipe-photo" src={ meals[0].strMealThumb } alt="foto" />

          <div>

            <div>
              <h3 data-testid="recipe-title">{meals[0].strMeal}</h3>
              <ShareButton />
              <FavoriteFoodButton foodArr={ meals[0] } />
            </div>

            <h5 data-testid="recipe-category">{meals[0].strCategory}</h5>

            <CheckListIngredients
              recipeId={ idFood }
              drink={ false }
              setComplet={ setComplet }
              ingreObj={ meals[0] }
            />

            <div>
              <h4>Instruções</h4>
              <p data-testid="instructions">
                {meals[0].strInstructions}
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
