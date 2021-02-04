import React from 'react';
import '../components/components.css';
import PropTypes from 'prop-types';
import {
  Button, DrinkRecomendation, LoadingCard, ShareButton, FavoriteFoodButton,
} from '../components';
import { useFetchApi } from '../hooks';

const filterMeals = (arr, str) => Object.entries(arr).filter((key) => (
  key[0].includes(str) && !!key[1]
));

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
  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>
          <img
            data-testid="recipe-photo"
            src={ meals[0].strMealThumb }
            alt="foto"
            style={ { width: 360 } }
          />
          <div>
            <div>
              <h3 data-testid="recipe-title">{meals[0].strMeal}</h3>
              <ShareButton />
              <FavoriteFoodButton foodArr={ meals[0] } />
            </div>
            <h5 data-testid="recipe-category">{meals[0].strCategory}</h5>
            <div>
              <h4>Ingredients</h4>
              <ul>
                {
                  filterMeals(meals[0], 'strIngredient').map((key, i) => {
                    const measures = filterMeals(meals[0], 'strMeasure');
                    return (
                      <li
                        data-testid={ `${i}-ingredient-name-and-measure` }
                        key={ i }
                      >
                        {`${key[1]} - ${measures[i][1]}`}
                      </li>
                    );
                  })
                }
              </ul>
            </div>
            <div>
              <h4>Instruções</h4>
              <p data-testid="instructions">
                {meals[0].strInstructions}
              </p>
            </div>
            <div>
              <h4>Video</h4>
              <iframe
                data-testid="video"
                title={ meals[0].strMeal }
                width="360"
                height="260"
                src={ meals[0].strYoutube.replace('watch?v=', 'embed/') }
              />
            </div>
            <h4>Recomendadas</h4>
            <DrinkRecomendation meals={ meals[0] } />
            <Button
              testid="start-recipe-btn"
              text="Iniciar Receita"
              func={ () => { push(`/comidas/${idFood}/in-progress`); } }
            />
          </div>
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
