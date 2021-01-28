import React, { useContext } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';
import RecipeContext from '../Context/Context';

function DrinksRecipes() {
  const { drinkFetch } = useFetch();
  const { recipes } = useContext(RecipeContext);
  return (
    <div>
      <Header title="Bebidas" explore funcFetch={ drinkFetch } />
      {recipes.drinks && recipes.drinks.map((drink) => (<Card
        key={ drink.idDrink }
        name={ drink.strDrink }
      />))}
    </div>
  );
}

export default DrinksRecipes;
