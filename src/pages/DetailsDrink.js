import React, { useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, FoodRecomendation, LoadingCard,
  ShareButton, FavoriteButton, NotFound,
} from '../components';
import { useFetchApi, useRecipeInProgress } from '../hooks';
import { getKeys, getURL } from '../Services';
import './css/details.css';

export default function DetailsDrink() {
  const { push } = useHistory();
  const { id } = useParams();

  const URL = getURL({ id: id || 'random' });
  const [loading, { drinks }] = useFetchApi(URL);
  const [drinkObj] = drinks || [''];

  const ingredients = getKeys(drinkObj, 'strIngredient');
  const measures = getKeys(drinkObj, 'strMeasure');

  const [itemsChecks] = useRecipeInProgress(id);
  const recipeInProgress = useMemo(() => (
    itemsChecks.length !== ingredients.length
  ), [itemsChecks, ingredients]);

  if (!loading && !drinkObj) return (<NotFound />);

  const location = window.location.href;

  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>
          <img
            data-testid="recipe-photo"
            src={ drinkObj.strDrinkThumb }
            alt="foto"
            style={ { width: 360 } }
          />
          <div>
            <div>
              <h3 data-testid="recipe-title">{drinkObj.strDrink}</h3>
              <ShareButton URL={ location } />
              <FavoriteButton obj={ drinkObj } drink />
            </div>
            <h5 data-testid="recipe-category">{drinkObj.strAlcoholic}</h5>
            <div>
              <h4>Ingredients</h4>
              <ul>
                {
                  ingredients.map((key, i) => {
                    const [, ingredient] = key || ['', ''];
                    const [, measure] = measures[i] || ['', ''];
                    return (
                      <li
                        data-testid={ `${i}-ingredient-name-and-measure` }
                        key={ i }
                      >
                        {`${ingredient} - ${measure}`}
                      </li>
                    );
                  })
                }
              </ul>
            </div>
            <div>
              <h4>Instruções</h4>
              <p data-testid="instructions">
                {drinkObj.strInstructions}
              </p>
            </div>
            <div>
              <h5>Recomendadas</h5>
              <FoodRecomendation />
            </div>
            <Button
              testid="start-recipe-btn"
              text={ recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
              position="btn-fixed"
              func={ () => { push(`/bebidas/${id}/in-progress`); } }
            />
          </div>
        </div>
      )

  );
}
