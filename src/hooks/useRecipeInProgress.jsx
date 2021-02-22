import { useEffect, useState, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

const getItems = (id, recipesImProgress, key) => {
  const defaultKey = { [key]: { [id]: [] } };
  const storage = recipesImProgress || defaultKey;
  const recipes = storage[key] || defaultKey;
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

/** useRecipeInProgress
 * Recebe o id da receita como primeiro parametro.
 * Como segundo parametro recebe um valor booleano que verifica se é cocktails ou meals;
 * No caso de cocktails não é necessário adicionar o segundo parâmetro;
 * Caso meals aticione o segunto parâmetro como false;
 * Retorna uma array com um valor e uma função para setar um novo valor;
 * O item 0 da array é uma array com os items presentes no localStorage correspondente ao
 * tipo 'cocktails'/'meals' e ao id.
 * ex.({cocktails: { [id]: ['1'] }}) ===> ['1'] .
 * É retorna apenas o array atualizado dinamicamente.
 * O item 1, retorna uma função que recebe item como parametro
 * adcionando o mesmo a lista no localStoraga.
*/
export default function useRecipeInProgress(id, drink = true) {
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
