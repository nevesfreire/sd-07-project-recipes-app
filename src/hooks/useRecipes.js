import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FoodAppContext from '../context/FoodAppContext';

function useRecipes(historys) {
  const { handleClickDetail } = useContext(FoodAppContext);
  const { location } = historys;
  const { pathname } = location;
  const recipes = pathname.split('/');
  const zero = 0;
  const doze = 12;

  const history = useHistory();

  const handleToDetail = (id) => {
    handleClickDetail(id, recipes[1]);
    history.push(`/${recipes[1]}/${id}`);
  };

  return [handleToDetail, recipes, zero, doze];
}

export default useRecipes;
