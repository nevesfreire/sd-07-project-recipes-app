import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';

function CardsFood() {
  const { foods, fetchFoods } = useContext(RecipesContext);

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div>
      { foods.map(({ strMeal, strMealThumb, idMeal }, index) => (
        <Link key={ strMeal } to={ `/comidas/${idMeal}` }>
          <div
            data-testid={ `${index}-recipe-card` }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              width="200"
              alt="Meal"
            />
            <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CardsFood;
