import { useMemo, useState, useCallback } from 'react';
import useFetchApi from './useFetchApi';
import { localStorage, getURL } from '../Services';

const getRecipe = (obj, drink) => {
  if (!obj) return {};
  const type = drink ? 'bebida' : 'comida';
  const keyType = drink ? 'Drink' : 'Meal';
  const newRecipe = {
    id: obj[`id${keyType}`],
    type,
    area: obj.strArea || '',
    category: obj.strCategory || '',
    alcoholicOrNot: obj.strAlcoholic || '',
    name: obj[`str${keyType}`],
    image: obj[`str${keyType}Thumb`],
  };
  return newRecipe;
};

export default function useFavoriteRecipes(id, drink) {
  const URL = useMemo(() => getURL({ id }, drink), [id, drink]);
  const [, result] = useFetchApi(URL);
  const obj = useMemo(() => {
    const key = drink ? 'drinks' : 'meals';
    const keyValue = result[key] || '';
    const [newObj] = keyValue || [''];
    return newObj;
  }, [result, drink]);

  const storageFavorites = useMemo(() => {
    const defaultStorage = [];
    const storage = localStorage.get('favoriteRecipes') || defaultStorage;
    return storage;
  }, []);

  const [favorites, setState] = useState(storageFavorites);

  const favorite = useMemo(() => favorites
    .find(({ id: recipeID }) => recipeID === id), [favorites, id]);

  const setFavorite = useCallback(() => {
    const recipe = getRecipe(obj, drink);
    const favoriteStorage = favorites || [];
    const newFavorite = favorite
      ? [...favoriteStorage.filter(({ id: recipeID }) => id !== recipeID)]
      : [...favoriteStorage, recipe];
    localStorage.set('favoriteRecipes', newFavorite);
    setState(newFavorite);
  }, [favorites, favorite, obj, drink, id]);

  return { favorites, favorite, setFavorite };
}
