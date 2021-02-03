import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import RequestIngredientsDrink from '../../services/ingredientDrink';
import RequestDrinkAPI from '../../services/drinkApi';
import { DrinkContext } from '../../providers/AllProviders';

const DrinkExploreIngredient = () => {
  const { setData } = useContext(DrinkContext);
  const [ingredients, setIngredients] = useState([]);
  const [drinksRedirect, setDrinksRedirect] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      const maxCards = 12;
      const maxIngredients = await RequestIngredientsDrink();
      setIngredients(maxIngredients.filter((_, index) => index < maxCards));
    };
    fetchAPI();
  }, []);

  const handleClick = async (query) => {
    setData(await RequestDrinkAPI(query));
    setDrinksRedirect(true);
  };

  if (drinksRedirect) return <Redirect to="/bebidas" />;

  return (
    <div>
      { ingredients.map(({ strIngredient1: ingredient }, index) => (
        <button
          key={ ingredient }
          type="button"
          onClick={ () => handleClick(ingredient) }
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
            alt={ `${ingredient} thumb` }
          />
          <h2 data-testid={ `${index}-card-name` }>{ingredient}</h2>
        </button>
      ))}
    </div>
  );
};

export default DrinkExploreIngredient;
