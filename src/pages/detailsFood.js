import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecipeContext from '../context/RecipeContext';

function DetailsFood() {
  const [load, setLoad] = useState(false);
  const { data, setData } = useContext(RecipeContext);
  const { food } = data;
  const history = useHistory();
  const path = history.location.pathname;
  const idPathName = path.split('/');
  const endPointIdFood = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  const getFoodId = async (id) => {
    try {
      const { meals } = await fetch(`${endPointIdFood}${id}`)
        .then((result) => result.json());
      return setData({
        ...data,
        food: meals });
    } catch (err) {
      return 'erro';
    }
  };

  useEffect(() => {
    async function calledIdFood() {
      await getFoodId(idPathName[2]);
      setLoad(true);
    }
    calledIdFood();
  }, []);

  const cardFood = () => (
    <div>
      <img
        src={ food[0].strMealThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ food[0].strMeal }</h1>
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
      <p data-testid="recipe-category">{ food[0].strCategory }</p>
      <h2>
        Ingredientes
      </h2>
      <p data-testid="0-ingredient-name-and-measure">
        {food[0].strIngredient1}
        :
        {food[0].strMeasure1}
      </p>
      <p data-testid="1-ingredient-name-and-measure">
        {food[0].strIngredient2}
        :
        {food[0].strMeasure2}
      </p>
      <p data-testid="2-ingredient-name-and-measure">
        {food[0].strIngredient3}
        :
        {food[0].strMeasure3}
      </p>
      <p data-testid="3-ingredient-name-and-measure">
        {food[0].strIngredient4}
        :
        {food[0].strMeasure4}
      </p>
      <p data-testid="4-ingredient-name-and-measure">
        {food[0].strIngredient5}
        :
        {food[0].strMeasure5}
      </p>
      <h2>Instruções</h2>
      <p data-testid="instructions">{ food[0].strInstructions }</p>
      <iframe
        data-testid="video"
        src={ food[0].strYoutube }
        title="Vídeo da receita"
      />
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
          ? cardFood()
          : 'Carregando...'
      }
    </div>
  );
}

export default DetailsFood;
