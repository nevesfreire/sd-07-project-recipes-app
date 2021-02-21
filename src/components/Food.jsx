import React, { useContext } from 'react';
import context from '../contextApi/context';
import renderFoodCard from '../helpers/renderFoodCard';
import radioData from '../data/helperParam';

function Food() {
  const tillTwelves = 12;
  let array;
  const { radio } = radioData;

  const { data: { food,
    radioBtn,
    filterByName,
    filterByFirstchar,
    filterByIngredient } } = useContext(context);

  const { meals: mealsByIngredient } = filterByIngredient;
  const { meals: mealsByName } = filterByName;

  const { meals } = food;
  array = meals;

  if (mealsByIngredient || mealsByName || filterByFirstchar) {
    switch (radioBtn) {
    case radio.ingredient:
      array = mealsByIngredient;

      break;
    case radio.byName:
      array = mealsByName;
      break;
    case radio.firstChar:
      array = filterByFirstchar;
      break;
    default:
      array = meals;
    }
  }

  return (
    <div className="food-card">
      {
        renderFoodCard(array, tillTwelves)
      }
    </div>
  );
}

export default Food;
