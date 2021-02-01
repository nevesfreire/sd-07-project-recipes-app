import React from 'react';
import '../components/components.css';
import PropTypes from 'prop-types';
import { shareIcon, whiteHeartIcon } from '../images';
import { Button, CardsFactory, LoadingCard,
} from '../components';
import { useFetchApi } from '../hooks';

const filterDrinks = (arr, str) => Object.entries(arr).filter((key) => (
  key[0].includes(str) && !!key[1]
));

export default function DetailsDrink({ history, match }) {
  const { params: { idDrink } } = match;
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
  const [loading, { drinks }] = useFetchApi(URL);
  return (
    loading
      ? (<LoadingCard />)
      : (
        <div>
          <img data-testid="recipe-photo" src={ drinks[0].strDrinkThumb } alt="foto" />
          <div>
            <div>
              <h3 data-testid="recipe-title">{drinks[0].strDrink}</h3>
              <Button
                testid="data-testid=`share-btn`"
                icon={ shareIcon }
                func={ () => { history.push(`/comidas/${idDrink}`); } }
              />
              <Button
                testid="favorite-btn"
                icon={ whiteHeartIcon }
                func={ () => { history.push(`/comidas/${idDrink}`); } }
              />
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
                {drinks[0].strInstructions}
              </p>
            </div>
            <div>
              <h4>Recomendadas</h4>
              <CardsFactory
                number={ 6 }
                drink={ false }
                URL="https://www.themealdb.com/api/json/v1/1/search.php?s="
                testidImg="-recomendation-img"
                testidCard="-recomendation-card"
                testidTitle="-recomendation-title"
              />
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
