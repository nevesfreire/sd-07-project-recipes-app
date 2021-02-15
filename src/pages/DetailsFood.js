import React, { useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button, DrinkRecomendation, NotFound,
  LoadingCard, ShareButton, FavoriteFoodButton,
} from '../components';
import { useFetchApi, useRecipeInProgress } from '../hooks';
import { getKeys, getURL } from '../Services';
import './css/details.css';

export default function DetailsFood() {
  const { push } = useHistory();
  const { idFood } = useParams();

  const drink = false;
  const URL = getURL({ id: idFood || 'random' }, drink);
  const [loading, { meals }] = useFetchApi(URL);
  const [mealsObj] = meals || [''];

  const ingredients = mealsObj && getKeys(mealsObj, 'strIngredient');
  const measures = mealsObj && getKeys(mealsObj, 'strMeasure');

  const [itemsChecks] = useRecipeInProgress(idFood, drink);
  const recipeInProgress = useMemo(() => itemsChecks.length !== ingredients.length,
    [itemsChecks, ingredients]);

  if (!loading && !meals) return (<NotFound />);

  return (
    loading
      ? (<LoadingCard />)
      : (
        <div className="details">

          <div className="detailsThumb">
            <img
              data-testid="recipe-photo"
              src={ mealsObj.strMealThumb }
              alt="foto"
            />
          </div>

          <div className="favoriteShare">
            <ShareButton />
            <FavoriteFoodButton foodArr={ mealsObj } />
          </div>

          <div className="instuctionsDetails">
            <h1 data-testid="recipe-title">{mealsObj.strMeal}</h1>
            <h5 data-testid="recipe-category">{mealsObj.strCategory}</h5>
            <h4>Instruções</h4>
            <p data-testid="instructions">
              {mealsObj.strInstructions}
            </p>
          </div>

          <div className="ingredients">
            <h4>Ingredients</h4>
            <ul>
              {
                ingredients.map((keys, i) => {
                  const [, ingredient] = keys || ['', ''];
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

          <div className="videoDetails">
            <h4>Video</h4>
            <iframe
              data-testid="video"
              title={ mealsObj.strMeal }
              src={ mealsObj.strYoutube.replace('watch?v=', 'embed/') }
              width="100%"
              height="100%"
            />
          </div>

          <h5>Recomendadas</h5>
          <DrinkRecomendation />
          <Button
            testid="start-recipe-btn"
            text={ recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
            position="btn-fixed"
            func={ () => { push(`/comidas/${idFood}/in-progress`); } }
          />
        </div>
      )

  );
}
