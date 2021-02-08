import React from 'react';
import PropTypes from 'prop-types';
import { Button, FoodRecomendation, LoadingCard,
  ShareButton, FavoriteDrinkButton, NotFound,
} from '../components';
import { useFetchApi, useLocalStorage } from '../hooks';
import { getKeys } from '../Services';
import './css/details.css';

const getLink = (idDrink) => (
  Number.isNaN(Number(idDrink))
    ? 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
);

export default function DetailsDrink({
  history, match }) {
  const { params: { idDrink } } = match;
  const URL = getLink(idDrink);
  const [loading, { drinks }] = useFetchApi(URL);
  const ingredienteList = drinks && getKeys(drinks[0], 'strIngredient');
  const measuresList = drinks && getKeys(drinks[0], 'strMeasure');

  const zero = 0;
  const [inProgress] = useLocalStorage('inProgressRecipes');
  if (!loading && !drinks) return (<NotFound />);
  const include = inProgress && Object.keys(inProgress.cocktails || {}).includes(idDrink);
  const recipeInProgress = (include && ingredienteList)
    && inProgress.cocktails[idDrink].length !== zero
    && ingredienteList.length > inProgress.cocktails[idDrink].length;
  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>
          <div className="details">
            <div className="detailsThumb">
              <img
                data-testid="recipe-photo"
                src={ drinks[0].strDrinkThumb }
                alt="foto"
                className="details-img"
              />
            </div>
            <div className="favoriteShare">
              <ShareButton />
              <FavoriteDrinkButton drinksArr={ drinks[0] } />
            </div>
            <div className="instructionsDetails">
              <h1 data-testid="recipe-title">{drinks[0].strDrink}</h1>
              <h5 data-testid="recipe-category">{drinks[0].strAlcoholic}</h5>
              <h4>Instruções</h4>
              <p data-testid="instructions">
                {drinks[0].strInstructions}
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
                      {`${key && key[1]} - ${measuresList[i] && measuresList[i][1]}`}
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
          <h5>Recomendadas</h5>
          <FoodRecomendation />
          <Button
            testid="start-recipe-btn"
            text={ recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
            position="btn-fixed"
            func={ () => { history.push(`/bebidas/${idDrink}/in-progress`); } }
          />
        </div>
      )

  );
}

DetailsDrink.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({ idDrink: PropTypes.string.isRequired }).isRequired,
  }).isRequired,
};
