import React, { useContext, useEffect, useState } from 'react';

import FoodAppContext from '../context/FoodAppContext';
import { categoryMealApi, mealsAPI } from '../services';
import '../styles/recipes.css';

function MainMeals() {
  const { mealsData, setMealsData, showSearch } = useContext(FoodAppContext);
  const [mealsCategory, setMealsCategory] = useState([]);

  async function fecthCategory() {
    const { meals: category } = await categoryMealApi();
    setMealsCategory(category);
  }

  useEffect(() => {
    fecthCategory();
  }, []);

  const zero = 0;
  const cinco = 5;
  const doze = 12;
  const bools = true;

  return (
    <section>
      <div className="div-category">
        <button
          type="button"
          data-testid="category-filter"
          hidden={ showSearch ? bools : false }
          onClick={ async () => {
            const { meals } = await mealsAPI('', '');
            setMealsData(meals);
          } }
        >
          All
        </button>
        {mealsCategory.slice(zero, cinco).map(({ strCategory }, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
            hidden={ showSearch ? bools : false }
            value={ strCategory }
            onClick={ async ({ target }) => {
              const { meals } = await mealsAPI(target.value, 'c');
              setMealsData(meals);
            } }
          >
            { strCategory }
          </button>
        ))}
      </div>
      <section className="section-meals">
        {mealsData.slice(zero, doze).map(({ idMeal, strMeal, strMealThumb }) => (
          <div key={ idMeal } className="div-meals" data-testid={ strMeal }>
            <img src={ strMealThumb } alt="meals" />
            <p>{ strMeal }</p>
          </div>
        ))}
      </section>
    </section>
  );
}

export default MainMeals;
