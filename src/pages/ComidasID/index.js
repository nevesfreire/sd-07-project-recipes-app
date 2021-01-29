import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Recommended from './Recommended';
import FoodThumb from '../../components/FoodThumb';
import { fetchFoodById, fetchFoodByName } from '../../redux/actions/foodActions';
import { fetchCocktailByName, fetchCocktailById } from '../../redux/actions/drinkActions';
import './styles.css';

function ComidasID({
  meals,
  drinks,
  fetchFoodId,
  fetchCocktails,
  fetchDrinkID,
  fetchMeals,
}) {
  const { route, id } = useParams();

  const nine = 9;
  const twoOne = 21;

  let detailed;
  let suggestions;
  let video;
  let indexDiff;

  useEffect(() => {
    if (route === 'comidas') {
      fetchFoodId(id);
      fetchCocktails('');
    } else {
      fetchDrinkID(id);
      fetchMeals('');
    }
  }, []);

  if (!meals[0] || !drinks[0]) return (<p>Carregando...</p>);

  if (route === 'comidas') {
    detailed = meals;
    video = true;
    suggestions = drinks;
    indexDiff = nine;
  } else {
    detailed = drinks;
    video = false;
    suggestions = meals;
    indexDiff = twoOne;
  }

  return (
    <div>
      <FoodThumb detailed={ detailed } route={ route } />
      <ul>
        Ingredientes:
        {Object.keys(detailed[0]).map((key, index) => {
          const ingredientIndex = key.match(/(\d+)/);
          if (detailed[0][key] && key.includes('strIngredient')) {
            const measure = `strMeasure${ingredientIndex[0]}`;
            return (
              <li
                key={ `measure-${index}` }
                data-testid={ `${index - indexDiff}-ingredient-name-and-measure` }
              >
                {`${detailed[0][key]} - ${detailed[0][measure]}`}
              </li>
            );
          }
          return null;
        })}
      </ul>
      <p data-testid="instructions">{ detailed[0].strInstructions }</p>
      {video && <a data-testid="video" href={ detailed[0].strYoutube }>Assistir Vídeo</a>}

      <Recommended suggestions={ suggestions } />
      <p>
        <Link
          to={ `/comidas/${id}/in-progress` }
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
          {/** esse botão desaparece caso receita já tenha sido feita */}
        </Link>
      </p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  meals: state.foodMeals.meals,
  drinks: state.cocktailsDrinks.cocktails,
});

const mapDispatchToProps = {
  fetchFoodId: fetchFoodById,
  fetchCocktails: fetchCocktailByName,
  fetchDrinkID: fetchCocktailById,
  fetchMeals: fetchFoodByName,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComidasID);

ComidasID.propTypes = {
  fetchFoodId: propTypes.func.isRequired,
  fetchCocktails: propTypes.func.isRequired,
  fetchDrinkID: propTypes.func.isRequired,
  fetchMeals: propTypes.func.isRequired,
  meals: propTypes.arrayOf(propTypes.object).isRequired,
  drinks: propTypes.arrayOf(propTypes.object).isRequired,
};
