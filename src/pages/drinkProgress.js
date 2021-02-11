import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getDrinkId } from '../services/Api';

function DrinkProgress() {
  const ZERO = 0;
  const arrayIngredients = [];
  const [arrayDrink, setArrayDrink] = useState();
  const idPathName = useHistory().location.pathname.split('/');

  useEffect(() => {
    const getArrayDrink = async () => {
      setArrayDrink(await getDrinkId(idPathName[2]));
    };
    getArrayDrink();
  }, []);

  if (arrayDrink) {
    const drinkKeys = Object
      .keys(arrayDrink[0]).filter((item) => item.includes('Ingredient'));

    for (let index = ZERO; index < drinkKeys.length; index += 1) {
      if (arrayDrink[0][drinkKeys[index]] && arrayDrink[0][drinkKeys[index]] !== '') {
        arrayIngredients.push(arrayDrink[0][drinkKeys[index]]);
      }
    }
  }
  const getRender = () => (
    <div>
      <img
        style={ { width: '30%' } }
        src={ arrayDrink[0].strDrinkThumb }
        alt={ arrayDrink[0].strDrink }
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">{arrayDrink[0].strDrink}</h3>
      <button data-testid="share-btn" type="button">Compartilhar</button>
      <button data-testid="favorite-btn" type="button">Favorito</button>
      <p data-testid="recipe-category">{arrayDrink[0].strCategory}</p>
      {
        arrayIngredients.map((ingredient, index) => (
          <div key="ingredient" data-testid={ `${index}-ingredient-step` }>
            <input type="checkbox" id={ ingredient } />
            <label htmlFor={ ingredient }>{ingredient}</label>
            {ingredient}
          </div>))
      }
      <textarea data-testid="instructions">
        {arrayDrink[0].strInstructions}
      </textarea>

      <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
    </div>
  );

  return (
    <div>
      {
        arrayDrink ? getRender() : 'Loading...'
      }
    </div>
  );
}

export default DrinkProgress;
