import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getCategoryDrinks } from '../services/drinkAPI';
import { getCategoryFoods } from '../services/foodAPI';

function Category() {
  const [categorys, setCategorys] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const checkLocation = history.location.pathname;

    if (checkLocation === '/bebidas') {
      getCategoryDrinks().then((response) =>
        setCategorys(response.drinks.slice(0, 5)),
      );
    }
    if (checkLocation === '/comidas') {
      getCategoryFoods().then((response) =>
        setCategorys(response.meals.slice(0, 5)),
      );
    }
  }, []);

  return (
    <div>
      {categorys.map((category) => {
        const name = category.strCategory;
        const dataTestId = `${name}-category-filter`;
        return (
          <button data-testid={dataTestId} key={name}>
            {name}
          </button>
        );
      })}
    </div>
  );
}

export default Category;
