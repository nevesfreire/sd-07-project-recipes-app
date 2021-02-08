import React from 'react';
import PropTypes from 'prop-types';
import { Button, DrinkRecomendation, NotFound,
  LoadingCard, ShareButton, FavoriteFoodButton,
} from '../components';
import { useFetchApi, useLocalStorage } from '../hooks';
import { getKeys } from '../Services';
import './css/details.css';

const getLink = (idFood) => (
  Number.isNaN(Number(idFood))
    ? 'https://www.themealdb.com/api/json/v1/1/random.php'
    : `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`
);

export default function DetailsFood({
  history: { push }, match }) {
  const { params: { idFood } } = match;
  const URL = getLink(idFood);
  const [loading, { meals }] = useFetchApi(URL);
  const ingredienteList = meals && getKeys(meals[0], 'strIngredient');
  const measuresList = meals && getKeys(meals[0], 'strMeasure');

  const zero = 0;
  const [inProgress] = useLocalStorage('inProgressRecipes');
  if (!loading && !meals) return (<NotFound />);
  const include = inProgress && Object.keys(inProgress.meals || {}).includes(idFood);
  const recipeInProgress = (include && ingredienteList)
    && inProgress.meals[idFood].length !== zero
    && ingredienteList.length > inProgress.meals[idFood].length;
  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>
          <div className="details">
            <div className="detailsThumb">
              <img
                data-testid="recipe-photo"
                src={ meals[0].strMealThumb }
                alt="foto"
                className="details-img"
              />
            </div>
            <div className="favoriteShare">
              <ShareButton />
              <FavoriteFoodButton foodArr={ meals[0] } />
            </div>
            <div className="instuctionsDetails">
              <h1 data-testid="recipe-title">{meals[0].strMeal}</h1>
              <h5 data-testid="recipe-category">{meals[0].strCategory}</h5>
              <h4>Instruções</h4>
              <p data-testid="instructions">
                {meals[0].strInstructions}
              </p>
            </div>
            <div className="ingredients">
              <h4>Ingredients</h4>
              <ul>
                {
                  ingredienteList.map((key, i) => (
                    <li
                      data-testid={ `${i}-ingredient-name-and-measure` }
                      key={ i }
                    >
                      {`${key[1]} - ${measuresList[i][1]}`}
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="videoDetails">
              <h4>Video</h4>
              <iframe
                data-testid="video"
                title={ meals[0].strMeal }
                src={ meals[0].strYoutube.replace('watch?v=', 'embed/') }
              />
            </div>
          </div>
          <div>
            <h5>Recomendadas</h5>
            <DrinkRecomendation />
          </div>
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

DetailsFood.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ idFood: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};
