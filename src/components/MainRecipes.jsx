import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FoodAppContext from '../context/FoodAppContext';
import useRecipes from '../hooks/useRecipes';

function MainRecipes() {
  const { mealsData, drinksData } = useContext(FoodAppContext);
  const history = useHistory();
  const [handleToDetail, recipes, zero, doze] = useRecipes(history);

  if (recipes[1] === 'comidas') {
    return (
      <section>
        <section className="section-meals">
          {mealsData && mealsData
            .slice(zero, doze)
            .map(({ idMeal, strMeal, strMealThumb }, index) => (
              <button
                type="button"
                key={ idMeal }
                className="div-meals"
                data-testid={ `${index}-recipe-card` }
                onClick={ () => handleToDetail(idMeal) }
              >
                <img
                  src={ strMealThumb }
                  alt="meals"
                  data-testid={ `${index}-card-img` }
                />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {strMeal}
                </p>
              </button>
            ))}
        </section>
      </section>
    );
  }
  return (
    <section>
      <section className="section-meals">
        {drinksData && drinksData
          .slice(zero, doze)
          .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <button
              type="button"
              key={ idDrink }
              className="div-meals"
              data-testid={ `${index}-recipe-card` }
              onClick={ () => handleToDetail(idDrink) }
            >
              <img
                src={ strDrinkThumb }
                alt="drinks"
                data-testid={ `${index}-card-img` }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {strDrink}
              </p>
            </button>
          ))}
      </section>
    </section>
  );
}

export default MainRecipes;
