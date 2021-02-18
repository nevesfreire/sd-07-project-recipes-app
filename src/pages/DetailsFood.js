import React, { useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, DrinkRecomendation, NotFound,
  LoadingCard, ShareButton, FavoriteButton,
} from '../components';
import { useFetchApi, useRecipeInProgress } from '../hooks';
import { getKeys, getURL } from '../Services';
import './css/details.css';

export default function DetailsFood() {
  const { push } = useHistory();
  const { id } = useParams();

  const drink = false;
  const URL = getURL({ id: id || 'random' }, drink);
  const [loading, { meals }] = useFetchApi(URL);
  const [mealsObj] = meals || [''];

  const ingredients = getKeys(mealsObj, 'strIngredient');
  const measures = getKeys(mealsObj, 'strMeasure');

  const [itemsChecks] = useRecipeInProgress(id, drink);
  const recipeInProgress = useMemo(() => (
    itemsChecks.length !== ingredients.length
  ), [itemsChecks, ingredients]);

  if (!loading && !mealsObj) return (<NotFound />);

  const location = window.location.href;

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
            <ShareButton URL={ location } />
            <FavoriteButton arr={ mealsObj } drink={ false } />
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
            func={ () => { push(`/comidas/${id}/in-progress`); } }
          />
        </div>
      )

  );
}
