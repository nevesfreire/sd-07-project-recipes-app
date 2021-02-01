import React, { useState, useContext, useEffect } from 'react';
import CoffeAndCodeContext from '../context/CoffeeAndCodeContext';
import { requestApiDrinkListCategories } from '../services/requestDrink';

function ButtonCategoriesDrink() {
  const [categorySelectedPreviously, setCategorySelectedPreviously] = useState('All');

  const {
    categoriesButtonDrink,
    setCategoriesButtonDrink,
    setCardDrink,
  } = useContext(CoffeAndCodeContext);

  const getCategoriesDrinkArray = async () => {
    const firstIndex = 0;
    const lastIndex = 6;
    const apiResult = await requestApiDrinkListCategories();
    const currentDrinkCategories = apiResult.slice(firstIndex, lastIndex)
      .map(({ strCategory }) => strCategory);
    const expectedDrinkCategories = ['All', ...currentDrinkCategories];
    setCategoriesButtonDrink(expectedDrinkCategories);
  };

  useEffect(() => {
    if (!categoriesButtonDrink.length) getCategoriesDrinkArray();
  }, []);

  if (!categoriesButtonDrink.length) return <span>Loading...</span>;

  return (
    <div>
      {
        categoriesButtonDrink.map((category) => (
          <button
            data-testid={ `${category}-category-filter` }
            type="button"
            key={ category }
          >
            { category }
          </button>
        )
        )
      }
    </div>
  );
}

export default ButtonCategoriesDrink;
