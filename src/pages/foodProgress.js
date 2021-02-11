import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getFoodId } from '../services/Api';

function FoodProgress() {
  const ZERO = 0;
  const arrayIngredients = [];
  const [arrayFood, setArrayFood] = useState();
  const idPathName = useHistory().location.pathname.split('/');
  const idFood = idPathName[2];

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

  const saveLocalStorage = (name) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes) {
      const objFoodIngredients = {
        ...inProgressRecipes,
        meals: { ...inProgressRecipes.meals,
          [idFood]: [...inProgressRecipes.meals[idFood], name] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(objFoodIngredients));
    } else {
      const objFoodIngredients = {
        cocktails: { },
        meals: { [idFood]: [name] },
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(objFoodIngredients));
    }
  };

  const handleChangeInput = ({ name }) => {
    saveLocalStorage(name);
  };
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
            <input
              checked
              type="checkbox"
              name={ ingredient }
              onChange={ (event) => (handleChangeInput(event.target)) }
            />
            <label htmlFor={ ingredient }>{ingredient}</label>
          </div>))
      }
      <textarea data-testid="instructions">
        {arrayFood[0].strInstructions}
      </textarea>

      <button
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ () => saveLocalStorage(arrayFood[0].idMeal) }
      >
        Finalizar Receita
      </button>
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
