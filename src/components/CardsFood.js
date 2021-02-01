import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import ListCardsFoods from './ListCardsFoods';

function CardsFood() {
  const { data } = useContext(RecipeContext);
  const MAX_ARRAY = 12;
  const arrayFoods = [...data.food];
  if (arrayFoods.length > MAX_ARRAY) arrayFoods.length = MAX_ARRAY;
  return (
    <div>
      <ListCardsFoods arrayFoods={ arrayFoods } />
    </div>
  );
}

export default CardsFood;
