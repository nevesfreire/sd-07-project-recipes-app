import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/recipesContext';

function CardsDrinks() {
  const { drinks, fetchDrinks } = useContext(RecipesContext);

  useEffect(() => {
    fetchDrinks();
  }, []);

  return (
    <div>
      { drinks.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
        <a
          key={ strDrink }
          href={ `/bebidas/${idDrink}` }
          data-testid={ `${index}-recipe-card` }
        >
          <div>
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              width="200"
              alt="drink"
            />
            <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default CardsDrinks;
