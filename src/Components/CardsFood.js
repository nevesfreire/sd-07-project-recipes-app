import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/recipesContext';
import './cards.css';

function CardsFood() {
  const { foods, fetchFoods } = useContext(RecipesContext);

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <div className="Container__Cards">
      { foods.map(({ strMeal, strMealThumb, idMeal }, index) => (
        <a
          className="cards__results"
          key={ strMeal }
          href={ `/comidas/${idMeal}` }
          data-testid={ `${index}-recipe-card` }
        >
          <div>
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              width="200"
              alt="Meal"
            />
            <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default CardsFood;
