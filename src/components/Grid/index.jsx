import React, { useContext, useEffect } from 'react';

import Context from '../../Context';
import Meals from '../../services/meals-api';

const Grid = () => {
  const {
    data,
    setData,
    categoryList,
    setCategoryList,
    filteredData,
    // setFilteredData,
    handleOnClickCategory,
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
              onClick={ () => handleOnClickCategory(strCategory) }
            >
              { strCategory}
            </button>
          ))
        }
      </div>
      <div>
        {
          filteredData.map(({ strMeal, strMealThumb }) => (
            <div key={ strMeal }>
              <img src={ strMealThumb } alt="meal" />
              <h2>{strMeal}</h2>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default Grid;
