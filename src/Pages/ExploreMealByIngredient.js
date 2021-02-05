import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../Context/Context';
import useFetch from '../hooks/useFetch';

function ExploreMealByIngredient() {
  const { mealByIngredient } = useContext(RecipeContext);
  const { fetchMealByIngredient, mealsByMainIngredient } = useFetch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMealByIngredient()
      .then(setLoading(false));
  }, []);

  const history = useHistory();

  if (loading) {
    return (<div>Loading...</div>);
  }

  async function fetchMeals(meal) {
    mealsByMainIngredient(meal)
      .then(() => history.push('/comidas'));
  }
  console.log('mealByIngredient', mealByIngredient);

  return (
    <div>
      {mealByIngredient.map((meal, index) => (
        <div
          key={ index }
          onKeyDown=""
          role="button"
          tabIndex="0"
          onClick={ () => fetchMeals(meal) }
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${meal.strIngredient}-Small.png` }
            alt={ meal.strIngredient }
          />
          <p data-testid={ `${index}-card-name` }>{ meal.strIngredient }</p>
        </div>
      ))}
    </div>
  );
}

export default ExploreMealByIngredient;
