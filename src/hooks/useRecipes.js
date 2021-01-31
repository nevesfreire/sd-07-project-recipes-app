import { useContext } from 'react';

import FoodAppContext from '../context/FoodAppContext';

function useRecipes(history) {
  const { handleClickDetail } = useContext(FoodAppContext);
  const { location } = history;
  const { pathname } = location;
  const recipes = pathname.split('/');
  const zero = 0;
  const doze = 12;

  const handleToDetail = (id) => {
    handleClickDetail(id, recipes[1]);
    history.push(`/${recipes[1]}/${id}`);
  };

  return [handleToDetail, recipes, zero, doze];
}

export default useRecipes;
