import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import RecipesContext from '../context/recipesContext';
import { apiFoods } from '../services/Services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function DetalhesComidas({ match: { params: { id } }, history }) {
  const [detailMeal, setDetailMeal] = useState([]);
  const { fetchDrinks, drinks } = useContext(RecipesContext);

  // const [recomendedDrinks, setRecomendedDrinks] = useState([]);

  useEffect(() => {
    const fetchDetailMeal = async () => {
      const detailMealResponse = await apiFoods(`lookup.php?i=${id}`);
      fetchDrinks();
      setDetailMeal(detailMealResponse);
    };
    fetchDetailMeal();
  }, []);
  console.log(detailMeal);

  const zero = 0;

  if (detailMeal.length === zero) return (<h1>Carregando...</h1>);

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = detailMeal[0];

  const detail = detailMeal[0];

  const ingredientsList = () => {
    const one = 1;
    const twenty = 20;
    const list = [];
    for (let index = one; index <= twenty; index += one) {
      if (detail[`strIngredient${index}`] !== '') {
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
  const six = 6;
  const recomendedDrinks = drinks.slice(zero, six);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    centerMode: false,
    slidesToScroll: 2,
  };

  const stringSplit = strYoutube.split('v=');

  function clickStartRecipes() {
    history.push(`/comidas/${id}/in-progress`);
  }

  return (
    <div>
      <img
        src={ strMealThumb }
        alt={ strMeal }
        data-testid="recipe-photo"
        width="200px"
      />
      <h4 data-testid="recipe-title">{ strMeal }</h4>
      <h6 data-testid="recipe-category">{ strCategory }</h6>
      <button
        data-testid="share-btn"
        type="button"
      >
        <img
          src={ shareIcon }
          alt="share"
        />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        <img
          src={ whiteHeartIcon }
          alt="whiteHeart"
        />
      </button>
      <h6><b>Ingredientes</b></h6>
      <ul>{(ingredientsList())}</ul>
      <h6><b>Instructions</b></h6>
      <p data-testid="instructions">{ strInstructions }</p>
      <p data-testid="video">Aqui fica o vídeo do youtube</p>
      <iframe
        title="Video"
        width="420"
        height="345"
        src={ `http://www.youtube.com/embed/${stringSplit[1]}?autoplay=1` }
      />
      <p>Recomendados</p>
      <div>
        <Slider { ...settings }>
          { recomendedDrinks.map(({ strDrinkThumb, strDrink }, index) => (
            <div key={ index }>
              <img
                className="Recipe__Recomended"
                data-testid={ `${index}-recomendation-card` }
                src={ strDrinkThumb }
                alt={ index }
                width="50px"
              />
              <p data-testid={ `${index}-recomendation-title` }>{ strDrink }</p>
            </div>
          )) }
        </Slider>
      </div>
      <button
        type="button"
        className="Recipes__Start__Btn"
        data-testid="start-recipe-btn"
        onClick={ clickStartRecipes }
      >
        Iniciar receita
      </button>
    </div>
  );
}
DetalhesComidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.func.isRequired,
};

export default DetalhesComidas;
