import React, { useState, useEffect } from 'react';

import {
  fetchAPIFood,
  fetchAPICategoriesFood,
  fetchAPICategoriesFoodFilter,
} from '../services/api';
import Footer from '../components/Footer';

function Foods() {
  const [apiCategoriesFood, setApiCategoriesFood] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState([]);

  const getApiFood = async () => {
    setFilterByCategory(await fetchAPIFood());
  };

  const getApiCategoriesFood = async () => {
    setApiCategoriesFood(await fetchAPICategoriesFood());
  };

  useEffect(() => {
    getApiFood();
    getApiCategoriesFood();
  }, []);

  const handleClick = async ({ target: { name } }) => {
    const filterCategory = (await fetchAPICategoriesFoodFilter(name));
    const filterCategoryFood = filterCategory.filter((item) => item.strMeal);
    setFilterByCategory(filterCategoryFood);
  };

  const zero = 0;
  const maxMeals = 12;
  const maxCategoriesMeals = 5;

  return (
    <div>
      <div>
        {apiCategoriesFood !== undefined ? (
          apiCategoriesFood.map((item) => (
            <button
              className="btn btn-outline-dark btn-sm btn-block"
              style={ { width: '22.5rem' } }
              data-testid={ `${item.strCategory}-category-filter` }
              name={ item.strCategory }
              type="button"
              onClick={ handleClick }
              key={ item.strCategory }
            >
              {item.strCategory}
            </button>
          )).slice(zero, maxCategoriesMeals)
        ) : []}
      </div>
      <div className="row" style={ { width: '23.4rem' } }>
        {filterByCategory.map((item, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ item.strMeal }
            className="card col-6"
            style={ { width: '8rem' } }
          >
            <img
              data-testid={ `${index}-card-img` }
              className="card-img-top"
              src={ item.strMealThumb }
              alt="Imagem de capa do card"
            />
            <div className="card-body">
              <p
                data-testid={ `${index}-card-name` }
                className="card-text"
              >
                { item.strMeal }
              </p>
            </div>
          </div>
        )).slice(zero, maxMeals)}
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
