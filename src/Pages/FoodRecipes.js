import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';
import RecipeContext from '../Context/Context';

function FoodRecipes() {
  const { foodFetch } = useFetch();
  const { recipes } = useContext(RecipeContext);
  const um = 1;

  function handleRoutes() {
    const zero = 0;
    const doze = 12;
    return recipes.meals && recipes.meals.slice(zero, doze).map((meal, index) => (<Card
      key={ meal.idMeal }
      name={ meal.strMeal }
      thumb={ meal.strMealThumb }
      index={ index }
    />));
  }

  return (
    <div>
      <Header title="Comidas" explore funcFetch={ foodFetch } />
      {recipes.meals && recipes.meals.length === um
        ? <Redirect to={ `/comidas/${recipes.meals[0].idMeal}` } />
        : handleRoutes()}
    </div>
  );
}

export default FoodRecipes;
