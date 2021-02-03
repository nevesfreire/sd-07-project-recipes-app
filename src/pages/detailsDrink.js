import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecipeContext from '../context/RecipeContext';

function DetailsDrink() {
  const [load, setLoad] = useState(false);
  const { data, setData } = useContext(RecipeContext);
  const { drink } = data;
  const history = useHistory();
  const path = history.location.pathname;
  const idPathName = path.split('/');
  const endPointIdDrink = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  const getDrinkId = async (id) => {
    try {
      const { drinks } = await fetch(`${endPointIdDrink}${id}`)
        .then((result) => result.json());
      return setData({
        ...data,
        drink: drinks });
    } catch (err) {
      return 'erro';
    }
  };

  useEffect(() => {
    async function calledIdDrink() {
      await getDrinkId(idPathName[2]);
      setLoad(true);
    }
    calledIdDrink();
  }, []);

  const cardDrink = () => (
    <div>
      <img
        src={ drink[0].strDrinkThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ drink[0].strDrink }</h1>
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
      <p data-testid="recipe-category">{ drink[0].strCategory }</p>
      <h2>
        Ingredientes
      </h2>
      <p data-testid="0-ingredient-name-and-measure">
        {drink[0].strIngredient1}
        :
        {drink[0].strMeasure1}
      </p>
      <p data-testid="1-ingredient-name-and-measure">
        {drink[0].strIngredient2}
        :
        {drink[0].strMeasure2}
      </p>
      <p data-testid="2-ingredient-name-and-measure">
        {drink[0].strIngredient3}
        :
        {drink[0].strMeasure3}
      </p>
      <p data-testid="3-ingredient-name-and-measure">
        {drink[0].strIngredient4}
        :
        {drink[0].strMeasure4}
      </p>
      <p data-testid="4-ingredient-name-and-measure">
        {drink[0].strIngredient5}
        :
        {drink[0].strMeasure5}
      </p>
      <p>Aqui vem os ing e todos precisam do data-testid acima</p>
      <h2>Instruções</h2>
      <p data-testid="instructions">{ drink[0].strInstructions }</p>
      <div data-testid="0-recomendation-card">
        <h2>Recomendadas</h2>
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
        load
          ? cardDrink()
          : 'Carregando...'
      }
    </div>
  );
}

export default DetailsDrink;
