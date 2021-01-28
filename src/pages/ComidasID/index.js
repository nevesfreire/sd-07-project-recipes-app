import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFoodById } from '../../redux/actions/foodActions';
import { fetchCocktailByName } from '../../redux/actions/drinkActions';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function ComidasID({ meals, fetchFoodId, fetchCocktails }) {
  const { id } = useParams();

  useEffect(() => {
    fetchFoodId(id);
    fetchCocktails('');
  }, []);

  if (!meals[0]) return (<p>Carregando...</p>);

  return (
    <div>
      <img
        data-testid="recipe-photo"
        alt=""
        src={ meals[0].strMealThumb }
      />
      <h2
        data-testid="recipe-title"
      >
        { meals[0].strMeal }
      </h2>
      <button type="button" data-testid="share-btn">
        <img alt="" src={ shareIcon } />
      </button>
      <button type="button" data-testid="favorite-btn">
        <img alt="" src={ whiteHeartIcon } />
      </button>
      <h4 data-testid="recipe-category">{ meals[0].strCategory }</h4>
      <ul>
        Ingredientes:
        {Object.keys(meals[0]).map((key, index) => {
          const ingredientIndex = key.match(/(\d+)/);
          if (meals[0][key] && key.includes('strIngredient')) {
            const nine = 9;
            const measure = `strMeasure${ingredientIndex[0]}`;
            return (
              <li
                data-testid={ `${index - nine}-ingredient-name-and-measure` }
              >
                {`${meals[0][key]} - ${meals[0][measure]}`}
              </li>
            );
          }
          return null;
        })}
      </ul>
      <p data-testid="instructions">{ meals[0].strInstructions }</p>
      <a data-testid="video" href={ meals[0].strYoutube }>Assistir Vídeo</a>
      {/** card de recomendaçoes data-testid="${index}-recomendation-card" */}
      <p>
        <Link
          to={ `/comidas/${id}/in-progress` }
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
        >
          iniciar/continuar receita
          {/** esse botão desaparece caso receita já tenha sido feita */}
        </Link>
      </p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  meals: state.foodMeals.meals,
  drinks: state.cocktailsDrinks,
});

const mapDispatchToProps = {
  fetchFoodId: fetchFoodById,
  fetchCocktails: fetchCocktailByName,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComidasID);
