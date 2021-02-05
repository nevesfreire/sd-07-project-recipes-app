import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../Context/Context';
import useFetch from '../hooks/useFetch';

function ExploreDrinkByIngredient() {
  const { drinkByIngredient } = useContext(RecipeContext);
  const { fetchDrinkByIngredient, drinksByMainIngredient } = useFetch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrinkByIngredient()
      .then(setLoading(false));
  }, []);

  const history = useHistory();

  if (loading) {
    return (<div>Loading...</div>);
  }

  async function fetchMeals(drink) {
    drinksByMainIngredient(drink)
      .then(() => history.push('/bebidas'));
  }
  console.log('drinkByIngredient', drinkByIngredient);
  return (
    <div>
      {drinkByIngredient.map((drink, index) => (
        <div
          key={ index }
          onKeyDown=""
          role="button"
          tabIndex="0"
          onClick={ () => fetchMeals(drink) }
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${drink}-Small.png` }
            alt={ drink }
          />
          <p data-testid={ `${index}-card-name` }>{ drink }</p>
        </div>
      ))}
    </div>
  );
}

export default ExploreDrinkByIngredient;
