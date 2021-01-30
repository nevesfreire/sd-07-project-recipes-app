import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

import {
  fetchDrinkDetailsById,
  fetchFoodDetailsById,
} from '../services/API';

import
{
  getIngredients,
  checkOut,
}
  from '../services/service';

function CardInProgress() {
  const ingredientsfromlocalstorage = localStorage.getItem('checkedList')
    ? localStorage.getItem('checkedList')
    : [];

  const [details, setDetails] = useState({});
  const [checkedList, setCheckedList] = useState(ingredientsfromlocalstorage);

  const matchObject = useRouteMatch();

  const mealType = matchObject.path === '/comidas/:id/in-progress' ? 'Meal' : 'Drink';
  const localStorageKeyType = mealType === 'Meal' ? 'meals' : 'cocktails';

  const itemId = matchObject.params.id;

  useEffect(() => {
    const getDetails = async () => {
      let fromFetch = [];
      fromFetch = mealType === 'Drink'
        ? await fetchDrinkDetailsById(itemId)
        : await fetchFoodDetailsById(itemId);
      if (fromFetch) setDetails(fromFetch[0]);
    };
    getDetails();
  }, [itemId, mealType]);

  const addToCheckedList = (value) => {
    setCheckedList(checkOut(checkedList, value));
  };

  useEffect(() => {
    const getLocalStorageList = () => {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ [localStorageKeyType]:
        { [itemId]: checkedList } }));
    };
    getLocalStorageList();
  }, [checkedList, itemId, localStorageKeyType]);

  const loadIngredients = () => (
    <ul>
      {getIngredients(details).map((item, index) => (
        <li
          key={ `ìngredient${index}` }
          data-testid={ `data-testid=${index}-ingredient-step` }
        >
          <label htmlFor={ `${item.ingredient}` }>
            <input
              type="checkbox"
              value={ `${item.ingredient}` }
              onChange={ (event) => addToCheckedList(event.target.value) }
            />
            <img
              width="30px"
              src={ `https://www.themealdb.com/images/ingredients/${item.ingredient}.png` }
              alt="ingredient"
            />
            {item.measure}
            {' '}
            -
            {' '}
            {item.ingredient}
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <img
        alt="Meal Thumbnail"
        width="100%"
        data-testid="recipe-photo"
        src={ details[`str${mealType}Thumb`] }
        tagName="img"
      />
      <h3 data-testid="recipe-title">{details[`str${mealType}`]}</h3>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <h4 width="90%" data-testid="recipe-category">
        {
          mealType === 'Meal'
            ? details.strCategory
            : details.strAlcoholic
        }
      </h4>
      {loadIngredients()}
      <p width="90%" data-testid="instructions">{details.strInstructions}</p>
      <button
        className="button-begin"
        type="button"
        width="100%"
        data-testid="finish-recipe-btn"
      >
        Finish
      </button>

    </div>
  );
}

export default CardInProgress;
