import { useMemo, useState, useCallback } from 'react';
import { localStorage } from '../Services';

const getRecipe = (obj, drink) => {
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

export default function useFavoriteRecipes(obj, drink) {
  const storageFavorites = useMemo(() => {
    const defaultStorage = [];
    const storage = localStorage.get('favoriteRecipes') || defaultStorage;
    return storage;
  }, []);

  const [favorites, setState] = useState(storageFavorites);

  const favorite = useMemo(() => {
    const { id: recipeID } = getRecipe(obj, drink);
    return favorites.find(({ id }) => recipeID === id);
  }, [favorites, obj, drink]);

  const setFavorite = useCallback(() => {
    const recipe = getRecipe(obj, drink);
    const favoriteStorage = favorites || [];
    const newFavorite = favorite
      ? [...favoriteStorage.filter(({ id }) => id !== recipe.id)]
      : [...favoriteStorage, recipe];
    localStorage.set('favoriteRecipes', newFavorite);
    setState(newFavorite);
  }, [favorites, favorite, obj, drink]);

  return { favorite, setFavorite };
}
