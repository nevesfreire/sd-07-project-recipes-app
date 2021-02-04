import React from 'react';
import '../components/components.css';
import PropTypes from 'prop-types';
import { Button, FoodRecomendation, LoadingCard, ShareButton, FavoriteDrinkButton,
} from '../components';
import { useFetchApi } from '../hooks';

const filterDrinks = (arr, str) => Object.entries(arr).filter((key) => (
  key[0].includes(str) && !!key[1]
));

const getLink = (idDrink) => (
  Number.isNaN(Number(idDrink))
    ? 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
);

export default function DetailsDrink({ history, match }) {
  const { params: { idDrink } } = match;
  const URL = getLink(idDrink);
  const [loading, { drinks }] = useFetchApi(URL);
  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>
          <img
            data-testid="recipe-photo"
            src={ drinks[0].strDrinkThumb }
            alt="foto"
            style={ { width: 360 } }
          />
          <div>
            <div>
              <h3 data-testid="recipe-title">{drinks[0].strDrink}</h3>
              <ShareButton />
              <FavoriteDrinkButton drinksArr={ drinks[0] } />
            </div>
            <h5 data-testid="recipe-category">{drinks[0].strAlcoholic}</h5>
            <div>
              <h4>Ingredients</h4>
              <ul>
                {
                  filterDrinks(drinks[0], 'strIngredient').map((key, i) => {
                    const measures = filterDrinks(drinks[0], 'strMeasure');
                    return (
                      <li
                        data-testid={ `${i}-ingredient-name-and-measure` }
                        key={ i }
                      >
                        {`${key && key[1]} - ${measures[i] && measures[i][1]}`}
                      </li>
                    );
                  })
                }
              </ul>
            </div>
            <div>
              <h4>Instruções</h4>
              <p data-testid="instructions">
                {drinks[0].strInstructions}
              </p>
            </div>
            <div>
              <h5>Recomendadas</h5>
              <FoodRecomendation />
            </div>
            <Button
              testid="start-recipe-btn"
              text="Iniciar Receita"
              func={ () => { history.push(`/bebidas/${idDrink}/in-progress`); } }
            />
          </div>
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
