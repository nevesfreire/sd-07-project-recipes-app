import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import useCategory from '../hooks/useCategory';

function Category() {
  const history = useHistory();

  const [cinco, zero, bools, category, showSearch, mealsCategory,
    drinksCategory, setToggle, fetchCategory, handlerCategoryMeals,
    handlerCategoryAllMeals, handlerCategoryAllDrinks,
    handlerCategoryDrinks] = useCategory(history);

  useEffect(() => {
    fetchCategory();
  }, []);

  if (category[1] === 'comidas') {
    return (
      <div className="div-category">
        <button
          type="button"
          data-testid="All-category-filter"
          hidden={ showSearch ? bools : false }
          onClick={ handlerCategoryAllMeals }
        >
          All
        </button>
        {mealsCategory && mealsCategory
          .slice(zero, cinco)
          .map(({ strCategory }, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ `${strCategory}-category-filter` }
              hidden={ showSearch ? bools : false }
              value={ strCategory }
              onMouseMove={ () => setToggle(false) }
              onClick={ handlerCategoryMeals }
            >
              { strCategory}
            </button>
          ))}
      </div>
    );
  }
  return (
    <div className="div-category">
      <button
        type="button"
        data-testid="All-category-filter"
        hidden={ showSearch ? bools : false }
        onClick={ handlerCategoryAllDrinks }
      >
        All
      </button>
      {drinksCategory && drinksCategory
        .slice(zero, cinco)
        .map(({ strCategory }, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
            hidden={ showSearch ? bools : false }
            value={ strCategory }
            onMouseMove={ () => setToggle(false) }
            onClick={ handlerCategoryDrinks }
          >
            { strCategory}
          </button>
        ))}
    </div>
  );
}

export default Category;
