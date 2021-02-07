import { useContext } from 'react';

import FoodAppContext from '../context/FoodAppContext';
import useInProgressRecipe from './useInProgressRecipe';

function useProgressIngredient(id, recipes) {
  const { detailRecipe } = useContext(FoodAppContext);
  const [/* handleClick */, /* disable */, /* setIngredientCount */,
  ] = useInProgressRecipe();

  const { meals } = detailRecipe;
  const { drinks } = detailRecipe;
  const details = recipes === 'comidas' ? meals : drinks;
  const zero = 0;
  const two = 2;
  let ingredients = [];
  let measures = [];

  if (details) {
    const keyAndValueArray = Object.entries(details[0]);
    ingredients = keyAndValueArray.filter(([key, value]) => (
      key.includes('strIngredient') && (value !== null && value.length > zero)
    ));
    measures = keyAndValueArray.filter(([key, value]) => (
      key.includes('strMeasure') && (value !== null && value.length > zero)
    ));
  }
  return [ingredients, measures, two];
}

export default useProgressIngredient;
