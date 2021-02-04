import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { getFoodId } from '../services/Api';
import DrinkRecom from '../components/DrinkRecom';

function DetailsFood() {
  const [dataFood, setDataFood] = useState([]);
  const history = useHistory();
  const path = history.location.pathname;
  const idPathName = path.split('/');
  const ZERO = 0;

  useEffect(() => {
    async function calledIdFood() {
      setDataFood(await getFoodId(idPathName[2]));
    }
    calledIdFood();
  }, []);

  const cardFood = () => (
    <div>
      <img
        style={ { width: '30%' } }
        src={ dataFood[0].strMealThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ dataFood[0].strMeal }</h1>
      <label htmlFor="shareBtn">
        <input
          type="image"
          src={ shareIcon }
          alt="share icon"
          data-testid="share-btn"
          id="shareBtn"
        />
      </label>
      <label htmlFor="favoriteBtn">
        <input
          type="image"
          src={ whiteHeartIcon }
          alt="favorite icon"
          data-testid="favorite-btn"
          id="favoriteBtn"
        />
      </label>
      <p data-testid="recipe-category">{ dataFood[0].strCategory }</p>
      <h2>
        Ingredientes
      </h2>
      <p data-testid="0-ingredient-name-and-measure">
        {dataFood[0].strIngredient1}
        :
        {dataFood[0].strMeasure1}
      </p>
      <p data-testid="1-ingredient-name-and-measure">
        {dataFood[0].strIngredient2}
        :
        {dataFood[0].strMeasure2}
      </p>
      <p data-testid="2-ingredient-name-and-measure">
        {dataFood[0].strIngredient3}
        :
        {dataFood[0].strMeasure3}
      </p>
      <p data-testid="3-ingredient-name-and-measure">
        {dataFood[0].strIngredient4}
        :
        {dataFood[0].strMeasure4}
      </p>
      <p data-testid="4-ingredient-name-and-measure">
        {dataFood[0].strIngredient5}
        :
        {dataFood[0].strMeasure5}
      </p>
      <p data-testid="5-ingredient-name-and-measure">
        {dataFood[0].strIngredient6}
        :
        {dataFood[0].strMeasure6}
      </p>
      <p data-testid="6-ingredient-name-and-measure">
        {dataFood[0].strIngredient7}
        :
        {dataFood[0].strMeasure7}
      </p>
      <p data-testid="7-ingredient-name-and-measure">
        {dataFood[0].strIngredient8}
        :
        {dataFood[0].strMeasure8}
      </p>
      <h2>Instruções</h2>
      <p data-testid="instructions">{ dataFood[0].strInstructions }</p>
      <embed
        data-testid="video"
        type="video/quicktime"
        src={ dataFood[0].strYoutube }
      />
      <div>
        <h2>Recomendadas</h2>
        {DrinkRecom()}
      </div>
      <button
        style={ { position: 'fixed', bottom: 0 } }
        className="startRecipeBtn"
        type="button"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
  return (
    <div>
      {
        dataFood.length > ZERO ? cardFood() : 'Carregando...'
      }
    </div>
  );
}

export default DetailsFood;
