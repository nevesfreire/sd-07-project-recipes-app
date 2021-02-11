import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getFoodId } from '../services/Api';

function FoodProgress() {
  const ZERO = 0;
  const arrayIngredients = [];
  const [arrayFood, setArrayFood] = useState();
  const idPathName = useHistory().location.pathname.split('/');

  useEffect(() => {
    const getArrayFood = async () => {
      setArrayFood(await getFoodId(idPathName[2]));
    };
    getArrayFood();
  }, []);

  if (arrayFood) {
    const foodKeys = Object
      .keys(arrayFood[0]).filter((item) => item.includes('Ingredient'));

    for (let index = ZERO; index < foodKeys.length; index += 1) {
      if (arrayFood[0][foodKeys[index]] && arrayFood[0][foodKeys[index]] !== '') {
        arrayIngredients.push(arrayFood[0][foodKeys[index]]);
      }
    }
  }
  const getRender = () => (
    <div>
      <img
        style={ { width: '30%' } }
        src={ arrayFood[0].strMealThumb }
        alt={ arrayFood[0].strMeal }
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{arrayFood[0].strMeal}</h3>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favorito</button>
      <p data-testid="recipe-category">{arrayFood[0].strCategory}</p>
      {
        arrayIngredients.map((ingredient, index) => (
          <div key="ingredient" data-testid={ `${index}-ingredient-step` }>
            <input type="checkbox" id={ ingredient } />
            <label htmlFor={ ingredient }>{ingredient}</label>
            {ingredient}
          </div>))
      }
      <textarea data-testid="instructions">
        {arrayFood[0].strInstructions}
      </textarea>

      <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
    </div>
  );

  return (
    <div>
      {
        arrayFood ? getRender() : 'Loading...'
      }
    </div>
  );
}

export default FoodProgress;
