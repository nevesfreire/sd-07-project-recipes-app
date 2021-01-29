import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  fetchDrinkDetailsById,
  fetchFoodDetailsById,
  fetchGlobalMeal,
  fetchGlobalDrink,
} from '../services/API';
import CardList from './CardList';

function Details({ itemId, mealType }) {
  const quinze = 15;
  const zero = 0;
  const [details, setDetails] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const history = useHistory();
  const [showMessage, setShowMessage] = useState("hidden");

  useEffect(() => {
    const getRecommendation = async () => {
      let fetchRecommendation = [];
      if (mealType === 'Drink') fetchRecommendation = await fetchGlobalMeal();
      if (mealType === 'Meal') fetchRecommendation = await fetchGlobalDrink();
      if (fetchRecommendation) {
        fetchRecommendation.length = 6;
        await setRecommendation(fetchRecommendation);
      }
    };
    getRecommendation();
  }, [mealType]);

  useEffect(() => {
    const getDetails = async () => {
      let fromFetch = [];
      if (mealType === 'Drink') fromFetch = await fetchDrinkDetailsById(itemId);
      if (mealType === 'Meal') fromFetch = await fetchFoodDetailsById(itemId);
      if (fromFetch) setDetails(fromFetch[0]);
    };

    getDetails();
  }, [itemId, mealType, recommendation]);

  const forwardToInProgress = () => {
    if (mealType === 'Meal') {
      history.push(`/comidas/${itemId}/in-progress`)
    }
    if (mealType === 'Drink') {
      history.push(`/bebidas/${itemId}/in-progress`)
    }
  };

  const loadIngredients = () => {
    const ingredientsList = [];
    for (let i = 1; i <= quinze; i += 1) {
      if (details[`strIngredient${i}`]) {
        ingredientsList.push({
          ingredient: details[`strIngredient${i}`],
          measure: details[`strMeasure${i}`],
        });
      }
    }
    return (
      <ul>
        {ingredientsList.map((item, index) => (
          <li
            key={`ìngredient${index}`}
            data-testid={`${index}-ingredient-name-and-measure`}
          >
            <img
              width="30px"
              src={`https://www.themealdb.com/images/ingredients/${item.ingredient}.png`}
              alt="ingredient"
            />
            {item.measure}
            {' '}
            -
            {' '}
            {item.ingredient}
          </li>
        ))}
      </ul>
    );
  };

  const showDetails = () => {
    console.log(details);
    return (
      <div className="details">
        <img
          alt="Meal Thumbnail"
          width="100%"
          data-testid="recipe-photo"
          src={details[`str${mealType}Thumb`]}
          tagName="img" // sei lá se é isso
        />
        <h3 data-testid="recipe-title">{details[`str${mealType}`]}</h3>
        <button
          type="button"
          data-testid="share-btn"
          onClick={() => copyLink()}
        >Compartilhar</button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={() => addToFavorites()}
        >Favoritar</button>
        <h5 hidden={showMessage}>"Link copiado!"</h5>
        <h5 width="90%" data-testid="recipe-category">
          {
            mealType === 'Meal'
              ? details.strCategory
              : details.strAlcoholic
          }
        </h5>
        { loadIngredients()}
        <p width="90%" data-testid="instructions">{details.strInstructions}</p>
        {mealType === 'Meal'
          && (<a data-testid="video" href={details.strYoutube}>Video</a>)}
        <CardList
          arrayOfCard={recommendation}
          typeOfCard={mealType === 'Meal' ? 'Drink' : 'Meal'}
          sideScroll=" sideScroll"
          recommendation
        />
        <button
          className="button-begin"
          type="button"
          width="100%"
          data-testid="start-recipe-btn"
          onClick={() => forwardToInProgress()}
        >
          Iniciar
        </button>
      </div >
    );
  };

  const addToFavorites = () => {
    const data = {
      id: itemId,
      type: mealType === "Meal" ? "comida" : "bebida",
      area: mealType === "Meal" ? details.strArea : "",
      category: details.strCategory,
      alcoholicOrNot: mealType === "Drinks" ? details.strAlcoholic : "",
      name: `str${mealType}`,
      image: `str${mealType}Thumb`,
    }

    let favList = JSON.parse(localStorage.getItem('favoriteRecipes'))

    if (favList) {
      if (favList.filter(item => item.id === itemId).length > zero) {
        console.log(favList, 'aqui')
        favList = favList.filter(item => item.id !== itemId)
        localStorage.setItem('favoriteRecipes', JSON.stringify(favList))
      } else {
        console.log('entrou aqui')
        localStorage.setItem('favoriteRecipes', JSON.stringify([...favList, data]))
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([data]))
    }
  }

  const copyLink = () => {
    const url = window.location.href;
    const copy = require('clipboard-copy')
    copy(url)
    setShowMessage("")
    setTimeout(function () { setShowMessage("hidden") }, 3000);
  }
  return (
    <div>
      {showDetails()}
    </div>
  );
}

Details.propTypes = {
  itemId: PropTypes.string.isRequired,
  mealType: PropTypes.string.isRequired,
};

export default Details;
