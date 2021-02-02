import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/recipesContext';

function CardsDrinks() {
  const { drinks, fetchDrinks } = useContext(RecipesContext);

  useEffect(() => {
    fetchDrinks();
  }, []);

  return (
    <div>
      { drinks.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
        <Link
          key={ strDrink }
          to={ `/bebidas/${idDrink}` }
        >
          <div data-testid={ `${index}-recipe-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              width="200"
              alt="drink"
            />
            <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CardsDrinks;
