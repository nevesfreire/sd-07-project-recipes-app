import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';

import FoodThumb from '../../components/FoodThumb';
import { fetchFoodById } from '../../redux/actions/foodActions';
import { fetchCocktailByName } from '../../redux/actions/drinkActions';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styles.css';

function ComidasID({ meals, drinks, fetchFoodId, fetchCocktails }) {
  const { id } = useParams();

  useEffect(() => {
    fetchFoodId(id);
    fetchCocktails('');
  }, []);

  if (!meals[0]) return (<p>Carregando...</p>);

  return (
    <div>
      <FoodThumb />
      <ul>
        Ingredientes:
        {Object.keys(meals[0]).map((key, index) => {
          const ingredientIndex = key.match(/(\d+)/);
          if (meals[0][key] && key.includes('strIngredient')) {
            const nine = 9;
            const measure = `strMeasure${ingredientIndex[0]}`;
            return (
              <li
                key={ `measure-${index}` }
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

      {drinks[0] && <Carousel>
        <div>
          <img alt="" src={ drinks[0].strDrinkThumb } className="recommended-img" />
          <p className="legend">{ drinks[0].strDrink }</p>
          <img alt="" src={ drinks[1].strDrinkThumb } className="recommended-img" />
          <p className="legend">{drinks[1].strDrink}</p>
        </div>
        <div>
          <img alt="" src={ drinks[2].strDrinkThumb } className="recommended-img" />
          <p className="legend">{ drinks[2].strDrink }</p>
          <img alt="" src={ drinks[3].strDrinkThumb } className="recommended-img" />
          <p className="legend">{drinks[3].strDrink}</p>
        </div>
        <div>
          <img alt="" src={ drinks[4].strDrinkThumb } className="recommended-img" />
          <p className="legend">{ drinks[4].strDrink }</p>
          <img alt="" src={ drinks[5].strDrinkThumb } className="recommended-img" />
          <p className="legend">{drinks[5].strDrink}</p>
        </div>
      </Carousel>}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ComidasID);

ComidasID.propTypes = {
  fetchFoodId: propTypes.func.isRequired,
  fetchCocktails: propTypes.func.isRequired,
  meals: propTypes.arrayOf(propTypes.object).isRequired,
  drinks: propTypes.arrayOf(propTypes.object).isRequired,
};
