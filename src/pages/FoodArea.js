import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchAPI, TWELVE } from '../services/helpers';
import RecipesContext from '../context/RecipesContext';

function FoodArea() {
  const [areas, setAreas] = useState([]);
  const [foodList, setFoodList] = useState([]);

  const { setMealRecipeId } = useContext(RecipesContext);

  useEffect(() => {
    const getAPI = async () => {
      const data = await fetchAPI('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const areasAPI = await data.meals;
      setAreas(areasAPI);
    };
    getAPI();
  }, []);

  useEffect(() => {
    const getAPI = async () => {
      const data = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const food = await data.meals;
      setFoodList(food);
    };
    getAPI();
  }, []);

  const showDetails = (id) => {
    setMealRecipeId(id);
  };

  const handleClick = (id) => {
    setMealRecipeId(id);
  };

  const handleChange = async ({ target }) => {
    if (target.value === 'All') {
      const data = await fetchAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      setFoodList(data.meals);
    } else {
      const data = await fetchAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`);
      setFoodList(data.meals);
    }
  };

  return (
    <div>
      <header>
        <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
          <option name="area" data-testid="All-option">All</option>
          {areas.map((area, index) => (
            <option
              key={ index }
              data-testid={ `${area.strArea}-option` }
              name="area"
            >
              {area.strArea}
            </option>
          ))}
        </select>
      </header>
      <div>
        { foodList
          .filter((_, indexFilter) => indexFilter < TWELVE)
          .map((recipe, index) => (
            <button
              type="button"
              onClick={ () => showDetails(recipe.idMeal) }
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <p data-testid={ `${index}-card-name` }>
                Nome:
                {recipe.strMeal}
              </p>
              <Link
                to={ `/comidas/${recipe.idMeal}` }
                onClick={ () => handleClick(recipe.idMeal) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  width="200px"
                  alt="receitas"
                  src={ recipe.strMealThumb }
                />
              </Link>
            </button>
          ))}
      </div>
    </div>
  );
}

export default FoodArea;
