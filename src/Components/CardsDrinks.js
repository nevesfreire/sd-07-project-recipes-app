import React, { useState, useEffect } from 'react';
import { apiDrinks } from '../services/Services';

function CardsDrinks() {
  const [drinks, setdrinks] = useState([]);

  useEffect(() => {
    const fetchdrinks = async () => {
      const searchdrinks = await apiDrinks('search.php?s=');
      setdrinks(searchdrinks);
    };
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
