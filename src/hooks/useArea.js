import { useContext, useState } from 'react';

import useRecipes from './useRecipes';
import FoodAppContext from '../context/FoodAppContext';
import { areaExplorerAPI } from '../services';

function useArea() {
  const { mealsData, setMealsData, mealsAPI } = useContext(FoodAppContext);
  const history = {
    location: {
      pathname: '/comidas',
    },
  };

  const [handleToDetail, /* recipes */, zero, doze] = useRecipes(history);
  const [areas, setAreas] = useState();

  const handlerAreaExplorer = async ({ target }) => {
    const { value } = target;
    if (value === 'All') {
      const { meals } = await mealsAPI('', '');
      setMealsData(meals);
    } else {
      const { meals } = await mealsAPI(value, 'a');
      setMealsData(meals);
    }
  };

  const fecthArea = async () => {
    const { meals } = await areaExplorerAPI();
    setAreas(meals);
  };

  return [mealsData, areas, zero, doze,
    handleToDetail, handlerAreaExplorer, fecthArea];
}

export default useArea;
