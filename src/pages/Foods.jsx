import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  fetchAPIFood,
  fetchAPICategoriesFood,
  fetchAPICategoriesFoodFilter,
} from '../services/api';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';

function Foods() {
  const { foodsOrDrinksList, isUse, setIsUse } = useContext(RecipesContext);
  const [apiCategoriesFood, setApiCategoriesFood] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonName, setButtonName] = useState('');

  const getApiFood = async () => {
    setFilterByCategory(await fetchAPIFood());
  };

  const getApiCategoriesFood = async () => {
    setApiCategoriesFood(await fetchAPICategoriesFood());
  };

  useEffect(() => {
    if (!isUse) {
      getApiFood();
      getApiCategoriesFood();
    }
    setIsUse(false);
  }, []);

  useEffect(() => {
    setFilterByCategory(foodsOrDrinksList);
  }, [foodsOrDrinksList]);

  const handleClick = async ({ target: { name } }) => {
    if (name === 'all') {
      const resetFilter = (await fetchAPIFood());
      setFilterByCategory(resetFilter);
    } else if (buttonClicked === false || buttonName !== name) {
      setButtonClicked(true);
      setButtonName(name);
      const filterCategory = (await fetchAPICategoriesFoodFilter(name));
      const filterCategoryFood = filterCategory.filter((item) => item.strMeal);
      setFilterByCategory(filterCategoryFood);
    } else {
      setButtonClicked(false);
      const resetFilter = (await fetchAPIFood());
      setFilterByCategory(resetFilter);
    }
  };

  const zero = 0;
  const maxMeals = 12;
  const maxCategoriesMeals = 5;

  return (
    <div>
      <div className="profile-buttons">
        <button
          className="btn color-button main-pages-buttons"
          data-testid="All-category-filter"
          name="all"
          type="button"
          onClick={ handleClick }
        >
          All
        </button>
        {apiCategoriesFood !== undefined ? (
          apiCategoriesFood.map((item) => (
            <button
              className="btn color-button main-pages-buttons"
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
        {filterByCategory !== undefined ? (
          filterByCategory.map((item, index) => (
            <Link
              to={ `/comidas/${item.idMeal}` }
              key={ item.strMeal }
              onClick={ () => console.log(item.idMeal) }
              className="card col-6"
              style={ { width: '8rem' } }
            >
              <div
                data-testid={ `${index}-recipe-card` }
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
            </Link>
          )).slice(zero, maxMeals)
        ) : (
          []
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
