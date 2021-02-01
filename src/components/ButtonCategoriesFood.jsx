import React, { useState, useContext, useEffect } from 'react';
import CoffeAndCodeContext from '../context/CoffeeAndCodeContext';
import { requestApiFoodListCategories } from '../services/requestFood';

function ButtonCategoriesFood() {
  const [categorySelectedPreviously, setCategorySelectedPreviously] = useState('All');

  const {
    categoriesButtonFood,
    setCategoriesButtonFood,
    setCardFood,
  } = useContext(CoffeAndCodeContext);

  const getCategoriesFoodArray = async () => {
    const firstIndex = 0;
    const lastIndex = 6;
    const apiResult = await requestApiFoodListCategories();
    const currentFoodCategories = apiResult.slice(firstIndex, lastIndex)
      .map(({ strCategory }) => strCategory);
    const expectedFoodCategories = ['All', ...currentFoodCategories];
    setCategoriesButtonFood(expectedFoodCategories);
  };

  useEffect(() => {
    if (!categoriesButtonFood.length) getCategoriesFoodArray();
  }, []);

  if (!categoriesButtonFood.length) return <span>Loading...</span>;

  return (
    <div>
      {
        categoriesButtonFood.map((category) => (
          <button
            data-testid={ `${category}-category-filter` }
            type="button"
            key={ category }
            onClick={ () => selectedCategory(category) }
          >
            { category }
          </button>
        )
        )
      }
    </div>
  );
}

export default ButtonCategoriesFood;
