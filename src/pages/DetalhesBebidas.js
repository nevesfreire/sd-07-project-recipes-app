import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import RecipesContext from '../context/recipesContext';
import { apiDrinks } from '../services/Services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function DetalhesBebidas({ match: { params: { id } }, history }) {
  const [detailDrink, setDetailDrink] = useState([]);
  const { fetchFoods, foods } = useContext(RecipesContext);
  useEffect(() => {
    const fetchDetailDrink = async () => {
      const detailDrinks = await apiDrinks(`lookup.php?i=${id}`);
      fetchFoods();
      setDetailDrink(detailDrinks);
    };

    fetchDetailDrink();
  }, []);

  const zero = 0;
  const six = 6;
  if (detailDrink.length === zero) return (<h1>Carregando...</h1>);

  const {
    strDrinkThumb,
    strDrink,
    strCategory,
    strInstructions,
    strAlcoholic,
  } = detailDrink[0];

  const detail = detailDrink[0];
  console.log(detailDrink[0]);

  const ingredientsList = () => {
    const one = 1;
    const twenty = 15;
    const list = [];
    for (let index = one; index <= twenty; index += one) {
      if (detail[`strIngredient${index}`] !== null) {
        list.push(
          <li
            data-testid={ `${index - one}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${detail[`strIngredient${index}`]} - ${detail[`strMeasure${index}`]}`}
          </li>,
        );
      }
    }
    return list;
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    centerMode: false,
    slidesToScroll: 2,
  };

  const recomendedFood = foods.slice(zero, six);

  function clickStartRecipes() {
    history.push(`/bebidas/${id}/in-progress`);
  }

  return (
    <div>
      <img
        src={ strDrinkThumb }
        data-testid="recipe-photo"
        alt={ strDrink }
        width="200px"
      />
      <h4 data-testid="recipe-title">{ strDrink }</h4>
      <h5 data-testid="recipe-category">{ strAlcoholic }</h5>
      <button type="button" src={ shareIcon }>
        <img data-testid="share-btn" src={ shareIcon } alt="share" />
      </button>
      <button type="button" src={ whiteHeartIcon }>
        <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="share" />
      </button>
      <h6><b>Ingredientes</b></h6>
      <ul>{(ingredientsList())}</ul>
      <h6>{ strCategory }</h6>
      <p data-testid="instructions">{ strInstructions }</p>
      <p>Recomendados</p>
      <div>
        <Slider { ...settings }>
          {recomendedFood.map(({ strMealThumb, strMeal }, index) => (
            <div className="Recipe__Recomended" key={ index }>
              <img
                data-testid={ `${index}-recomendation-card` }
                className={ { visibility: 'hidden !important' } }
                src={ strMealThumb }
                alt={ index }
                width="50px"
              />
              <p data-testid={ `${index}-recomendation-title` }>{ strMeal }</p>
            </div>
          ))}
        </Slider>
      </div>
      <button
        variant="warning"
        className="Recipes__Start__Btn"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ clickStartRecipes }
      >
        Iniciar receita
      </button>
    </div>
  );
}

DetalhesBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.func.isRequired,
};

export default DetalhesBebidas;
