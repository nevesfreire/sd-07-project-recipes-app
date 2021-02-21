import React, { useContext } from 'react';
import context from '../contextApi/context';
import renderDrinkCard from '../helpers/renderDrinkCard';
import radioData from '../data/helperParam';

function Beverage() {
  const tillTwelve = 12;
  let array;
  const { radio } = radioData;

  const { data: { beverage,
    radioBtn,
    filterByName,
    filterByFirstchar,
    filterByIngredient } } = useContext(context);

  const { drinks: drinksByName } = filterByName;
  const { drinks: drinksByIngredient } = filterByIngredient;
  const { drinks } = beverage;
  array = drinks;

  if (drinksByIngredient || drinksByName || filterByFirstchar) {
    switch (radioBtn) {
    case radio.ingredient:
      array = drinksByIngredient;
      break;
    case radio.byName:
      array = drinksByName;
      break;
    case radio.firstChar:
      array = filterByFirstchar;
      break;
    default:
      array = drinks;
    }
  }
  return (
    <div className="food-card">
      {
        renderDrinkCard(array, tillTwelve)
      }
    </div>
  );
}

export default Beverage;
