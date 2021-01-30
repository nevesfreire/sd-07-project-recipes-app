import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Explorer = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const [sortedFood, setSortedFood] = useState([]);
  const [sortedDrink, setSortedDrink] = useState([]);

  const callApi = async () => {
    const food = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const jsonFood = await food.json();
    const sortedFoodId = await jsonFood.meals[0];
    setSortedFood(sortedFoodId);
    const drink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    const jsonDrink = await drink.json();
    const sortedDrinksId = await jsonDrink.drinks[0];
    setSortedDrink(sortedDrinksId);
  };

  useEffect(() => {
    callApi();
  }, []);

  const redirect = () => {
    if (pathname === '/explorar/comidas') {
      return (
        <div>
          <Link
            to="/explorar/comidas/ingredientes"
            data-testid="explore-by-ingredient"
          >
            <img
              src="/"
              alt="Explorar por ingredientes"
            />
            Por Ingredientes
          </Link>
          <Link
            to="/explorar/comidas/area"
            data-testid="explore-by-area"
          >
            <img src="/" alt="Explorar por origem" />
            Por Local de Origem
          </Link>
          <Link
            to={ `/comidas/${sortedFood.idMeal}` }
            data-testid="explore-surprise"
          >
            <img src="/" alt="Me Surpreenda" />
            Me Surpreenda!
          </Link>
        </div>
      );
    }
    if (pathname === '/explorar/bebidas') {
      return (
        <div>
          <Link
            to="/explorar/bebidas/ingredientes"
            data-testid="explore-by-ingredient"
          >
            <img src="/" alt="Explorar bebidas por ingredientes" />
            Por Ingredientes
          </Link>
          <Link
            to={ `/bebidas/${sortedDrink.IdDrink}` }
            data-testid="explore-surprise"
          >
            <img src="/" alt="Me surpreenda" />
            Me Surpreenda!
          </Link>
        </div>
      );
    }
  };

  return (
    <div>
      { redirect() }
    </div>
  );
};

export default Explorer;
