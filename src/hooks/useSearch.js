import { useContext, useState } from 'react';

import FoodAppContext from '../context/FoodAppContext';
import { mealsAPI, drinksAPI } from '../services';

function useSearch() {
  const { setMealsData, setDrinksData } = useContext(FoodAppContext);
  const [fields, setFields] = useState({ term: '', type: '' });

  const handlerChange = ({ target }) => {
    const { name, value } = target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const handlerData = async (recipes, history, id) => {
    if (!recipes) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (recipes.length === 1) {
      const { location } = history;
      const { pathname } = location;
      history.push(`${pathname}/${recipes[0][id]}`);
    }
  };

  const handlerClick = async ({ target }, history) => {
    const { value } = target;
    const { term, type } = fields;
    if (value === 'Comidas') {
      const { meals } = await mealsAPI(term, type);
      setMealsData(meals);
      handlerData(meals, history, 'idMeal');
    } else if (value === 'Bebidas') {
      const { drinks } = await drinksAPI(term, type);
      setDrinksData(drinks);
      handlerData(drinks, history, 'idDrink');
    }
  };

  return [handlerChange, handlerClick];
}

export default useSearch;
