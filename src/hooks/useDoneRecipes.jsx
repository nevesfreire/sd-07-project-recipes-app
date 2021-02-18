import { useEffect, useMemo, useState, useCallback } from 'react';
import { localStorage } from '../Services';

const getNewRecipe = (obj, drink) => {
  const type = drink ? 'bebida' : 'comida';
  const keyType = drink ? 'Drink' : 'Meal';
  const tags = obj.strTags ? obj.strTags.split(',') : [];
  const doneDate = new Date().toLocaleDateString();

  const newRecipe = {
    id: obj[`id${keyType}`],
    type,
    area: obj.strArea || '',
    category: obj.strCategory || '',
    alcoholicOrNot: obj.strAlcoholic || '',
    name: obj[`str${keyType}`],
    image: obj[`str${keyType}Thumb`],
    doneDate,
    tags,
  };
  return newRecipe;
};

export default function useDoneRecipes(filter) {
  const doneRecipes = useMemo(() => {
    const defaultStorage = [];
    const storage = localStorage.get('doneRecipes') || defaultStorage;
    return storage;
  }, []);

  const [recipes, setRecipes] = useState(doneRecipes);

  useEffect(() => {
    const newRecipes = doneRecipes.filter(({ type }) => type === filter || !filter);
    setRecipes(newRecipes);
  }, [filter, doneRecipes]);

  const setNewRecipe = useCallback((obj, drink) => {
    const newRecipe = getNewRecipe(obj, drink);
    const newStorage = doneRecipes
      ? [...doneRecipes, newRecipe]
      : [newRecipe];
    localStorage.set('doneRecipes', newStorage);
  }, [doneRecipes]);

  return { recipes, setNewRecipe };
}
