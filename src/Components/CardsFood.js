import React, { useState, useEffect } from 'react';
import { apiFoods } from '../services/Services';

function CardsFood() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      const searchFoods = await apiFoods('search.php?s=');
      setFoods(searchFoods);
    };
    fetchFoods();
  }, []);

  return (
    <div>
      { foods.map(({ strMeal, strMealThumb }) => (
        <div key={ strMeal }>
          <img src={ strMealThumb } width="200" alt="Meal" />
          <p>{ strMeal }</p>
        </div>
      )) }
    </div>
  );
}

export default CardsFood;
