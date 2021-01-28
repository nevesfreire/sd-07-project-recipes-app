import React, { useContext, useEffect } from 'react';

import Context from '../../Context';
import Meals from '../../services/meals-api';

const startLimitToShow = 0;
const endLimitToShow = 12;

const Grid = () => {
  const { meals, setMeals } = useContext(Context);

  useEffect(() => {
    Meals.getAllMeals()
      .then((data) => setMeals(data))
      .catch((err) => console.log(err));
  }, [setMeals]);

  if (meals.length) {
    return meals
      .slice(startLimitToShow, endLimitToShow)
      .map(({ strMeal, strMealThumb }) => (
        <div key={ strMeal }>
          <img src={ strMealThumb } alt="meal" />
          <h2>{strMeal}</h2>
        </div>
      ));
  }

  return <h1>Meals</h1>;
};
export default Grid;
