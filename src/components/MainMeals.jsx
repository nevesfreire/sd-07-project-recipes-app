import React, { useContext } from 'react';

import FoodAppContext from '../context/FoodAppContext';
import '../styles/recipes.css';

function MainMeals() {
  const { mealsData, setMealsData,
    mealsCategory, showSearch } = useContext(FoodAppContext);

  const zero = 0;
  const cinco = 5;
  const doze = 12;
  const bools = true;

  return (
    <section>
      <div className="div-category">
        {mealsCategory.slice(zero, cinco).map(({ strCategory }, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ `${strCategory}-category-filter` }
            hidden={ showSearch ? bools : false }
            value={ strCategory }
            onClick={ ({ target }) => setMealsData(mealsData.slice(zero, doze).filter(
              ({ strCategory: mealsCat }) => mealsCat.includes(target.value),
            ))
            }
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
