import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/recipesContext';

function CardsDrinks() {
  const { drinks, fetchdrinks } = useContext(RecipesContext);

  useEffect(() => {
    fetchdrinks();
  }, []);

  return (
    <div>
      { drinks.map(({ strDrink, strDrinkThumb }) => (
        <div key={ strDrink }>
          <img src={ strDrinkThumb } width="200" alt="drink" />
          <p>{ strDrink }</p>
        </div>
      ))}
    </div>
  );
}

export default CardsDrinks;
