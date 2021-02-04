import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { getDrinkId } from '../services/Api';
import FoodRecom from '../components/FoodRecom';

function DetailsDrink() {
  const [dataDrink, setDataDrink] = useState([]);
  const history = useHistory();
  const path = history.location.pathname;
  const idPathName = path.split('/');
  const ZERO = 0;

  useEffect(() => {
    async function calledIdDrink() {
      setDataDrink(await getDrinkId(idPathName[2]));
    }
    calledIdDrink();
  }, []);

  const cardDrink = () => (
    <div>
      <img
        style={ { width: '30%' } }
        src={ dataDrink[0].strDrinkThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ dataDrink[0].strDrink }</h1>
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
      <h2 data-testid="recipe-category">{ dataDrink[0].strCategory }</h2>
      <h2 data-testid="recipe-category">{ dataDrink[0].strAlcoholic }</h2>
      <h2>
        Ingredientes
      </h2>
      <p data-testid="0-ingredient-name-and-measure">
        {dataDrink[0].strIngredient1}
        :
        {dataDrink[0].strMeasure1}
      </p>
      <p data-testid="1-ingredient-name-and-measure">
        {dataDrink[0].strIngredient2}
        :
        {dataDrink[0].strMeasure2}
      </p>
      <p data-testid="2-ingredient-name-and-measure">
        {dataDrink[0].strIngredient3}
        :
        {dataDrink[0].strMeasure3}
      </p>
      <p data-testid="3-ingredient-name-and-measure">
        {dataDrink[0].strIngredient4}
        :
        {dataDrink[0].strMeasure4}
      </p>
      <h2>Instruções</h2>
      <p data-testid="instructions">{ dataDrink[0].strInstructions }</p>
      <div data-testid="0-recomendation-card">
        <h2>Recomendadas</h2>
        {FoodRecom()}
      </div>
      <button
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
        dataDrink.length > ZERO ? cardDrink() : 'Carregando...'
      }
    </div>
  );
}

export default DetailsDrink;
