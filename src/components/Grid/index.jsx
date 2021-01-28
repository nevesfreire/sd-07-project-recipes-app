import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Context from '../../Context';
import Meals from '../../services/meals-api';

const Grid = () => {
  const {
    data,
    setData,
    categoryList,
    setCategoryList,
    filteredData,
    handleClickCategory,
  } = useContext(Context);

  useEffect(() => {
    const mealsAmountToShow = 12;

    Meals.getMeals(mealsAmountToShow)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }, [setData]);

  useEffect(() => {
    const categoriesAmountToShow = 5;

    Meals.getMealCategoryList(categoriesAmountToShow)
      .then((res) => setCategoryList(res))
      .catch((err) => console.log(err));
  }, [setCategoryList]);

  if (!data.length || !categoryList.length) {
    return <h1>Loading meals...</h1>;
  }

  return (
    <>
      <div>
        <button type="button">
          All
        </button>
        {
          categoryList.map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => handleClickCategory(strCategory) }
            >
              { strCategory}
            </button>
          ))
        }
      </div>
      <div>
        {
          filteredData.map(({ idMeal, strMeal, strMealThumb }) => (
            <Link
              to={ `/comidas/${idMeal}` }
              key={ idMeal }
            >
              <img src={ strMealThumb } alt="meal" />
              <h2>{strMeal}</h2>
            </Link>
          ))
        }
      </div>
    </>
  );
};

export default Grid;
