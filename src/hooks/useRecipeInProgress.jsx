import { useEffect, useState, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const getItems = (id, recipesImProgress, key) => {
  const storageDefault = { [key]: { [id]: undefined } };
  const recipes = recipesImProgress[key] || storageDefault;
  const items = recipes[id] || [];
  return items;
};

const getNewStorage = (recipesImProgress, key, id, state) => {
  const newStorage = recipesImProgress
    ? {
      ...recipesImProgress,
      [key]: { ...recipesImProgress[key], [id]: state },
    }
    : { [key]: { [id]: state } };
  return newStorage;
};

export default function useRecipeInProgress(id, drink) {
  const [recipesImProgress, setStorage] = useLocalStorage('inProgressRecipes');

  const key = drink ? 'cocktails' : 'meals';
  const items = getItems(id, recipesImProgress, key);

  const [state, setState] = useState(items);

  useEffect(() => {
    const newStorage = getNewStorage(recipesImProgress, key, id, state);
    setStorage(newStorage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const setItem = useCallback((value) => {
    const existing = state.find((item) => item === value);
    const newState = existing
      ? [...state.filter((item) => item !== value)]
      : [...state, value];
    setState(newState);
  }, [state]);

  return [state, setItem];
}
