import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const requestApi = async (url) => {
  const api = await fetch(url);
  const data = api.json();
  return data;
};

function ExplorerFoodArea() {
  const [area, setArea] = useState([]);
  const [foodArea, setFoodArea] = useState([]);

  const doze = 12;

  const getArea = async () => {
    const callApi = await requestApi('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    await setArea(callApi.meals);
    const food = await requestApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    await setFoodArea(food.meals);
  };

  useEffect(() => {
    getArea();
  }, []);

  const handleSet = async ({ target }) => {
    if (target.id === 'All') {
      const data = await requestApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      await setFoodArea(data.meals);
    } else {
      const data = await requestApi(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`);
      await setFoodArea(data.meals);
    }
  };

  return (
    <div>
      <select
        name="areas"
        data-testid="explore-by-area-dropdown"
        onChange={ handleSet }
      >
        <option data-testid="All-option">All</option>
        {area.map(({ strArea }) => (
          <option key={ strArea } data-testid={ `${strArea}-option` }>
            {strArea}
          </option>
        ))}
      </select>
      <div>
        {foodArea.length >= 1 && foodArea
          .filter((_, i) => i < doze)
          .map((food, index) => (
            <div key={ index }>
              <Link
                data-testid={ `${index}-recipe-card` }
                key={ index }
                to={ `/comidas/${food.idMeal}` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                />
                <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ExplorerFoodArea;
