import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import ListCardsDrinks from './ListCardsDrinks';

function CardsDrink() {
  const { data } = useContext(RecipeContext);
  const MAX_ARRAY = 12;
  const arrayDrinks = [...data.drink];
  if (arrayDrinks.length > MAX_ARRAY) arrayDrinks.length = MAX_ARRAY;
  console.log(data.drink);
  return (
    <div>
      <ListCardsDrinks arrayDrinks={ arrayDrinks } />
    </div>
  );
}

export default CardsDrink;
